import os
import time
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models
from utils import get_dataloaders
from tqdm import tqdm

# Configuration
DATA_DIR = './deepfake_model/dataset'
MODEL_SAVE_PATH = './models/deepfake_model.pth'
NUM_EPOCHS = 5 # Reduced to 5 for faster CPU training
BATCH_SIZE = 32
LEARNING_RATE = 0.001

def create_model(num_classes=2):
    """
    Initializes a pretrained EfficientNet-B0 model and modifies the final classification 
    layer to output num_classes.
    """
    print("Loading pretrained EfficientNet-B0 model...")
    # Load EfficientNet-B0 with default ImageNet pretrained weights
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT)
    
    # Replace the final fully connected layer (classifier[1] is the final linear layer)
    num_ftrs = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(num_ftrs, num_classes)
    
    return model

def train_model():
    # 1. Setup device (GPU or CPU)
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    # 2. Get DataLoaders
    if not os.path.exists(os.path.join(DATA_DIR, 'train')):
        print(f"ERROR: Dataset not found at {DATA_DIR}. Please setup the folder structure.")
        return
        
    dataloaders, dataset_sizes, class_names = get_dataloaders(DATA_DIR, BATCH_SIZE)

    # 3. Setup Model
    model = create_model(num_classes=len(class_names))
    model = model.to(device)

    # 4. Define Loss Function and Optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    
    # 5. Training Loop
    since = time.time()
    best_acc = 0.0

    print(f"Starting training loop for {NUM_EPOCHS} epochs...")

    for epoch in range(NUM_EPOCHS):
        print(f'\nEpoch {epoch+1}/{NUM_EPOCHS}')
        print('-' * 20)

        # Each epoch has a training and validation phase
        for phase in ['train', 'validation']:
            if phase == 'train':
                model.train()  # Set model to training mode
            else:
                model.eval()   # Set model to evaluate mode

            running_loss = 0.0
            running_corrects = 0

            # Use tqdm for progress bar
            progress_bar = tqdm(dataloaders[phase], desc=f"{phase.capitalize()} Phase")
            
            for inputs, labels in progress_bar:
                inputs = inputs.to(device)
                labels = labels.to(device)

                optimizer.zero_grad()

                # Forward pass
                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)

                    # Backward pass & optimize only in training phase
                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                # Statistics
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)
                
                # Update progress bar description with current metrics
                current_loss = running_loss / ((progress_bar.n + 1) * BATCH_SIZE)
                progress_bar.set_postfix({'loss': f'{current_loss:.4f}'})

            epoch_loss = running_loss / dataset_sizes[phase]
            epoch_acc = running_corrects.double() / dataset_sizes[phase]

            print(f'{phase.capitalize()} Loss: {epoch_loss:.4f} | Accuracy: {epoch_acc*100:.2f}%')

            # Deep copy the model if it's the best performing one
            if phase == 'validation' and epoch_acc > best_acc:
                best_acc = epoch_acc
                
                os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
                torch.save(model.state_dict(), MODEL_SAVE_PATH)
                print(f"*** New best model saved! Accuracy: {best_acc*100:.2f}% ***")

    time_elapsed = time.time() - since
    print(f'\nTraining complete in {time_elapsed // 60:.0f}m {time_elapsed % 60:.0f}s')
    print(f'Best Validation Accuracy: {best_acc*100:.2f}%')
    print(f'Your custom model is now successfully trained and saved at {MODEL_SAVE_PATH}')

if __name__ == '__main__':
    train_model()
