"""
Image Preprocessor Module.

Provides utilities for image loading, resizing, color conversion,
and normalization prior to pose detection and landmark extraction.
"""

from typing import Tuple, Optional
import numpy as np


class ImagePreprocessor:
    """Preprocesses raw images for pose landmark extraction."""

    def __init__(self, target_size: Optional[Tuple[int, int]] = None):
        self.target_size = target_size

    def preprocess(self, image: np.ndarray) -> np.ndarray:
        """
        Preprocess input image array.

        Args:
            image: Raw image in BGR or RGB format.

        Returns:
            Preprocessed image array.
        """
        # Placeholder for preprocessing pipeline (resizing, color normalization)
        return image
