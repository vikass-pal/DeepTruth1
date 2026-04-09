import os
import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

def get_dataloaders(data_dir: str, batch_size: int = 32):
    """
    Creates PyTorch DataLoaders for training and validation datasets.
    Applies rigorous data augmentation to the training set and standardizes the validation set.
    """
    
    # Requirements: 224x224 resize, random horizontal flip, random rotation, normalize, transform to tensor
    
    # ImageNet standard normalization values used for pretrained ResNet/EfficientNet
    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )

    data_transforms = {
        'train': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),  # Randomly rotate image by +/- 15 degrees
            transforms.ToTensor(),
            normalize
        ]),
        'validation': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            normalize
        ]),
    }

    image_datasets = {
        'train': datasets.ImageFolder(os.path.join(data_dir, 'train'), data_transforms['train']),
        'validation': datasets.ImageFolder(os.path.join(data_dir, 'validation'), data_transforms['validation'])
    }
    
    # Create DataLoaders
    dataloaders = {
        x: DataLoader(
            image_datasets[x], 
            batch_size=batch_size, 
            shuffle=(x == 'train'), 
            num_workers=4,          # Set higher if you have more CPU cores available
            pin_memory=torch.cuda.is_available() # Speeds up transfer to GPU
        )
        for x in ['train', 'validation']
    }
    
    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'validation']}
    class_names = image_datasets['train'].classes  # Expected: ['fake', 'real']

    print(f"Loaded {dataset_sizes['train']} training images and {dataset_sizes['validation']} validation images.")
    print(f"Classes found: {class_names}")

    return dataloaders, dataset_sizes, class_names

def load_label_map():
    # Helper to map predicted index to actual string class names
    # Ensure this matches the ImageFolder ordering. Usually ImageFolder sorts alphabetically: 
    # 0 = fake, 1 = real
    return {0: "FAKE", 1: "REAL"}
