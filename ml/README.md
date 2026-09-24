# ML Pose Analysis & Training Module

This module contains the offline machine learning, feature extraction, dataset processing, and model training pipeline for the AI Yoga Coach application.

> **Design Principle**: This module is completely isolated from the runtime web application. It is designed to complement and integrate with the existing MediaPipe/Pose Feature Engine and Rule Engine rather than replacing them.

---

## Directory Structure & Purpose

```text
ml/
├── dataset/
│   ├── raw/                  # Source yoga pose image datasets organized by class/asana
│   ├── processed/            # Cleaned, standardized images and extracted tabular landmark data
│   └── splits/               # Train, validation, and test dataset splits (e.g. CSV/parquet)
│
├── preprocessing/
│   ├── image_preprocessor.py # Image resizing, formatting, and color space transformations
│   └── quality_check.py      # Quality filters: blur detection, lighting/brightness, and contrast
│
├── pose/
│   └── mediapipe_extractor.py # Offline MediaPipe 33-landmark detector and coordinate extractor
│
├── features/
│   ├── landmark_normalizer.py # Translation, scale, and body-proportion coordinate normalization
│   └── pose_features.py       # Geometric feature extraction (joint angles, segment ratios, alignments)
│
├── training/
│   ├── prepare_dataset.py    # Pipeline script to extract features and generate dataset splits
│   ├── train.py              # Model training, hyperparameter optimization, and checkpoint saving
│   └── evaluate.py           # Evaluation script generating confusion matrices and metrics
│
├── inference/
│   └── predictor.py          # Standalone inference class for running predictions with trained models
│
├── models/                   # Serialized model checkpoints (.joblib, .onnx, weights)
├── reports/                  # Generated evaluation metrics, classification reports, and charts
├── requirements.txt          # Python dependencies required for this ML module
└── README.md                 # Module documentation and architectural overview
```

---

## Directory Overview

| Directory | Purpose |
| :--- | :--- |
| `dataset/raw/` | Stores uncurated source images organized by pose label. |
| `dataset/processed/` | Contains filtered, quality-checked images and intermediate landmark extractions. |
| `dataset/splits/` | Contains reproducible `train.csv`, `val.csv`, and `test.csv` feature matrices. |
| `preprocessing/` | Handles input image conditioning and filters out unsuitable frames (e.g. extreme blur or darkness). |
| `pose/` | Wraps MediaPipe Pose extraction to extract 33 3D keypoint coordinates from static samples. |
| `features/` | Centers and normalizes coordinates, extracting kinematic angles and distance metrics. |
| `training/` | Houses orchestration scripts to prepare datasets, train classification models, and run evaluations. |
| `inference/` | Lightweight predictor wrapper for serving predictions using trained model artifacts. |
| `models/` | Destination for exported model artifacts and scalers. |
| `reports/` | Destination for evaluation plots, confusion matrices, and training logs. |

---

## Setup & Installation

To set up the ML environment independently:

```bash
# Create and activate a virtual environment (optional)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install module dependencies
pip install -r ml/requirements.txt
```
