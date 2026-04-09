import os
import cv2
import torch
from PIL import Image
from transformers import pipeline
import warnings

# Suppress some transformers warnings
warnings.filterwarnings("ignore")

# Define our highly-accurate pretrained Hugging Face model
HF_MODEL_NAME = "dima806/deepfake_vs_real_image_detection"

# Constants
FACE_CASCADE_PATH = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

print("Loading Hugging Face Deepfake Detection Model... this may take a moment on first run to download the weights.")
detector = pipeline("image-classification", model=HF_MODEL_NAME)
print("Model loaded successfully!")

def extract_face(image_path: str):
    """
    Reads an image from disk using OpenCV, detects the largest face using Haar Cascades,
    crops the image to that face, and returns it as a PIL Image.
    Returns None if no face is found.
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image at {image_path}")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Load OpenCV Haar Cascade
    face_cascade = cv2.CascadeClassifier(FACE_CASCADE_PATH)
    
    # Detect faces
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(60, 60)
    )

    if len(faces) == 0:
        return None # No face detected
        
    # Get largest face if multiple
    faces = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)
    x, y, w, h = faces[0]
    
    # Optional: add padding to the bounding box
    padding = int(w * 0.1)
    
    x_start = max(0, x - padding)
    y_start = max(0, y - padding)
    x_end = min(img.shape[1], x + w + padding)
    y_end = min(img.shape[0], y + h + padding)

    face_crop = img[y_start:y_end, x_start:x_end]
    
    # Convert BGR (OpenCV) back to RGB (standard)
    face_rgb = cv2.cvtColor(face_crop, cv2.COLOR_BGR2RGB)
    
    # Return as PIL Image required by Transformers pipeline
    return Image.fromarray(face_rgb)

def predict_image(image_path: str):
    """
    Runs inference on an image path using a Hugging Face ViT model.
    Detects faces, heavily crops it, and feeds it to the pipeline.
    """
    # 1. Extract face from image for maximum accuracy
    face_img = extract_face(image_path)
    
    if face_img is None:
        print("Warning: No face found in image. Using whole image for inference as fallback.")
        face_img = Image.open(image_path).convert("RGB")

    # 2. Run Pipeline (handles resizing and tensor conversion internally)
    results = detector(face_img)

    # 3. Parse HF output format -> e.g. [{'label': 'Fake', 'score': 0.98}, {'label': 'Real', 'score': 0.02}]
    # The pipeline automatically sorts by highest score first
    top_prediction = results[0]
    
    hf_label = top_prediction["label"]
    
    # Standardize label wording for our system
    prediction = "Deepfake" if hf_label == "Fake" else "Authentic"
    confidence = top_prediction["score"]
    
    # Extract raw probabilities safely
    conf_fake = next((item['score'] for item in results if item["label"] == "Fake"), 0)
    conf_real = next((item['score'] for item in results if item["label"] == "Real"), 0)
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "raw_probabilities": {
            "fake": conf_fake,
            "real": conf_real
        }
    }

if __name__ == '__main__':
    # Test script locally
    import sys
    
    target_image_path = 'dataset/test_image.jpg' 
    if len(sys.argv) > 1:
        target_image_path = sys.argv[1]
        
    if os.path.exists(target_image_path):
        print(f"Running prediction on {target_image_path}...")
        results = predict_image(target_image_path)
        if "error" in results:
            print(results["error"])
        else:
            print(f"Prediction: {results['prediction']}")
            print(f"Confidence: {results['confidence']:.4f}")
            print(f"Raw Score (Fake): {results['raw_probabilities']['fake']:.4f}")
            print(f"Raw Score (Real): {results['raw_probabilities']['real']:.4f}")
    else:
        print(f"Image not found at {target_image_path}. Please provide a valid path.")
