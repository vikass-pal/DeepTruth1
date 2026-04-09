import os
import shutil
import random

source_dir = r"c:\Users\Vikas Pal\Downloads\archive\Final Dataset"
dest_dir = r"c:\Users\Vikas Pal\OneDrive\Desktop\DeepfakeAnti\backend\deepfake_model\dataset"

print(f"Setting up dataset from {source_dir} to {dest_dir}...")

# Create directories
for split in ['train', 'validation']:
    for cls in ['fake', 'real']:
        os.makedirs(os.path.join(dest_dir, split, cls), exist_ok=True)

# Process both classes
classes = [('Fake', 'fake'), ('Real', 'real')]

for src_cls, dest_cls in classes:
    src_cls_dir = os.path.join(source_dir, src_cls)
    if not os.path.exists(src_cls_dir):
        print(f"Warning: Source class dir {src_cls_dir} not found.")
        continue
        
    print(f"Reading files from {src_cls_dir}...")
    files = [f for f in os.listdir(src_cls_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    random.shuffle(files)
    
    split_idx = int(len(files) * 0.8)
    train_files = files[:split_idx]
    val_files = files[split_idx:]
    
    print(f"Copying {len(train_files)} files to train/{dest_cls} ...")
    for i, f in enumerate(train_files):
        shutil.copy2(os.path.join(src_cls_dir, f), os.path.join(dest_dir, 'train', dest_cls, f))
        if (i+1) % 1000 == 0:
            print(f"Copied {i+1} / {len(train_files)} train files...")
            
    print(f"Copying {len(val_files)} files to validation/{dest_cls} ...")
    for i, f in enumerate(val_files):
        shutil.copy2(os.path.join(src_cls_dir, f), os.path.join(dest_dir, 'validation', dest_cls, f))
        if (i+1) % 1000 == 0:
            print(f"Copied {i+1} / {len(val_files)} val files...")

print("Dataset setup complete!")
