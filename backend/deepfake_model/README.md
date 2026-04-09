# DeepTruth Machine Learning Pipeline

This module contains a complete end-to-end PyTorch training and inference pipeline for deepfake detection using transfer learning on a ResNet50 Architecture.

## Prerequisites
Ensure your backend virtual environment has the required dependencies, installed via:
```sh
pip install torch torchvision opencv-python Pillow
```

## 1. Dataset Preparation
To train the model, you must supply a dataset (such as FaceForensics++ or DFDC). 
Your dataset must be structured exactly like this inside the `deepfake_model/dataset/` directory:

```text
dataset/
├── train/
│   ├── fake/
│   │   ├── fake_image_1.jpg
│   │   └── ...
│   └── real/
│       ├── real_image_1.jpg
│       └── ...
└── validation/
    ├── fake/
    │   ├── val_fake_1.jpg
    │   └── ...
    └── real/
        ├── val_real_1.jpg
        └── ...
```

## 2. Training the Model
Once your dataset is structured properly, simply run the training script from your terminal:

```sh
cd backend
python deepfake_model/train_model.py
```

### What happens during training?
- Images are loaded, augmented (random horizontal flips, 15-degree rotations), and resized to `224x224`.
- A pretrained `ResNet50` model is downloaded via `torchvision`.
- The final classification layer is swapped specifically for 2 classes (REAL / FAKE).
- The model trains using the Adam Optimizer and CrossEntropyLoss for 15 epochs.
- The best performing model iteration on the validation dataset will be saved automatically to `backend/models/deepfake_model.pth`.

## 3. Image Inference
Once the `.pth` model file exists, you can run single-image inference. 
The script uses OpenCV (`haarcascade_frontalface_default.xml`) to scan the image, crop strictly to the person's face, resize it, and classify it.

```sh
# Inside inference.py, change `target_image_path` at the bottom, then run:

cd backend
python deepfake_model/inference.py
```

## 4. Video Inference
To analyze a video, the `video_detector.py` script opens the video, extracts frames periodically based on the sampling rate, detects faces in each frame, and runs an aggregate analysis to count how many frames the neural network believes have been synthetically manipulated.

```sh
# Inside video_detector.py, change `target_video_path` at the bottom, then run:

cd backend
python deepfake_model/video_detector.py
```
