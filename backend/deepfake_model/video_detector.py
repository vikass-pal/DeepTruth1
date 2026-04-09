import os
import cv2
import tempfile
from inference import predict_image

def analyze_video(video_path: str, samples_per_second: int = 1):
    """
    Takes a video path, extracts frames at `samples_per_second` intervals, 
    detects faces, runs model inference, and aggregates the overall deepfake probability.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file {video_path} not found.")

    v_capture = cv2.VideoCapture(video_path)
    if not v_capture.isOpened():
        raise ValueError(f"Could not open video file {video_path}")
        
    fps = v_capture.get(cv2.CAP_PROP_FPS)
    total_frames = int(v_capture.get(cv2.CAP_PROP_FRAME_COUNT))
    
    if fps <= 0 or total_frames <= 0:
        raise ValueError("Invalid FPS or frame count from video.")

    frame_interval = int(round(fps / samples_per_second))
    frame_interval = max(1, frame_interval) # Ensure we process at least every frame if FPS is low
    
    total_analyzed = 0
    fake_frames_count = 0
    cumulative_confidence_fake = 0.0

    print(f"Analyzing video: {os.path.basename(video_path)}")
    print(f"FPS: {fps}, Total Frames: {total_frames}, Sampling Interval: {frame_interval} frames")

    # Use a temporary directory to save chunks as images to be ran against `inference.py`
    with tempfile.TemporaryDirectory() as temp_dir:
        frame_idx = 0
        
        while True:
            ret, frame = v_capture.read()
            if not ret:
                break # End of video
                
            # Process only matching intervals
            if frame_idx % frame_interval == 0:
                temp_frame_path = os.path.join(temp_dir, f"frame_{frame_idx}.jpg")
                # Save frame
                cv2.imwrite(temp_frame_path, frame)
                
                # Run standard single-image analysis
                results = predict_image(temp_frame_path)
                
                # Cleanup frame
                os.remove(temp_frame_path)
                
                # Tally up metrics providing a face was successfully found
                if "error" not in results:
                    total_analyzed += 1
                    
                    # Log real/fake tallies
                    if results["prediction"] == "Deepfake":
                        fake_frames_count += 1
                        
                    cumulative_confidence_fake += results["raw_probabilities"]["fake"]
                
            frame_idx += 1

    v_capture.release()

    if total_analyzed == 0:
        return {
            "error": "Failed to find any readable faces in the video frames capable of analysis."
        }

    # Aggregate result logic
    fake_ratio = fake_frames_count / total_analyzed
    avg_fake_confidence = cumulative_confidence_fake / total_analyzed

    # If more than 30% of frames are fake, or average confidence leans highly fake, flag video 
    # (Thresholds can be adjusted through calibration)
    final_prediction = "Deepfake" if fake_ratio > 0.3 else "Authentic"
    final_confidence = avg_fake_confidence if final_prediction == "Deepfake" else (1.0 - avg_fake_confidence)

    return {
        "prediction": final_prediction,
        "confidence": final_confidence,
        "frames_analyzed": total_analyzed,
        "fake_frames": fake_frames_count,
        "authentic_frames": total_analyzed - fake_frames_count,
        "deepfake_ratio": fake_ratio
    }

if __name__ == '__main__':
    # Local video tester 
    target_video_path = 'dataset/test_video.mp4'
    
    if os.path.exists(target_video_path):
        result = analyze_video(target_video_path)
        if "error" in result:
            print(result["error"])
        else:
            print("\n----- VIDEO ANALYSIS -----")
            print(f"Fake frames: {result['fake_frames']} / {result['frames_analyzed']}")
            print(f"Deepfake Ratio: {result['deepfake_ratio']*100:.2f}%")
            print(f"Overall Prediction: {result['prediction']}")
            print(f"Model Confidence: {result['confidence']:.4f}")
    else:
        print("Please place a test video at dataset/test_video.mp4 to run this script directly.")
