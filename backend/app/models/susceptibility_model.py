"""
PyTorch Hazard Susceptibility Model Architectures & Data Pipeline Utilities
Adapted from GVCL/Susceptibility-Mapping-FL-Hetero pipeline architecture for RESITE-GIS.
"""

import os
import json
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader


class SusceptibilityNN(nn.Module):
    """
    Deep Multi-Layer Perceptron (MLP) for Hazard Susceptibility Mapping.
    
    Architecture:
      Input (C) -> Dense(128) + BatchNorm + ReLU + Dropout(0.3)
                -> Dense(64)  + BatchNorm + ReLU + Dropout(0.2)
                -> Dense(32)  + BatchNorm + ReLU
                -> Dense(1)   + Sigmoid -> Susceptibility Probability [0.0, 1.0]
    """
    def __init__(self, input_dim: int = 12, hidden_units: list = None, dropout_rates: list = None):
        super(SusceptibilityNN, self).__init__()
        if hidden_units is None:
            hidden_units = [128, 64, 32]
        if dropout_rates is None:
            dropout_rates = [0.3, 0.2]
            
        self.input_dim = input_dim
        self.hidden_units = hidden_units
        
        self.net = nn.Sequential(
            # Layer 1: C -> 128
            nn.Linear(input_dim, hidden_units[0]),
            nn.BatchNorm1d(hidden_units[0]),
            nn.ReLU(),
            nn.Dropout(dropout_rates[0]),
            
            # Layer 2: 128 -> 64
            nn.Linear(hidden_units[0], hidden_units[1]),
            nn.BatchNorm1d(hidden_units[1]),
            nn.ReLU(),
            nn.Dropout(dropout_rates[1]),
            
            # Layer 3: 64 -> 32
            nn.Linear(hidden_units[1], hidden_units[2]),
            nn.BatchNorm1d(hidden_units[2]),
            nn.ReLU(),
            
            # Output Layer: 32 -> 1
            nn.Linear(hidden_units[2], 1),
            nn.Sigmoid()
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


class SusceptibilityConv1D(nn.Module):
    """
    1D Convolutional Neural Network for Spatial Conditioning Feature Interaction.
    Extracts local cross-feature correlations across environmental factors.
    """
    def __init__(self, input_dim: int = 12, num_filters: int = 64):
        super(SusceptibilityConv1D, self).__init__()
        self.input_dim = input_dim
        self.conv1 = nn.Conv1d(in_channels=1, out_channels=num_filters, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm1d(num_filters)
        self.relu = nn.ReLU()
        self.conv2 = nn.Conv1d(in_channels=num_filters, out_channels=32, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm1d(32)
        self.dropout = nn.Dropout(0.25)
        self.fc1 = nn.Linear(32 * input_dim, 64)
        self.fc_bn = nn.BatchNorm1d(64)
        self.fc2 = nn.Linear(64, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Reshape (N, C) -> (N, 1, C)
        x = x.unsqueeze(1)
        x = self.relu(self.bn1(self.conv1(x)))
        x = self.dropout(self.relu(self.bn2(self.conv2(x))))
        x = x.view(x.size(0), -1)
        x = self.dropout(self.relu(self.fc_bn(self.fc1(x))))
        return self.sigmoid(self.fc2(x))


class HeteroSusceptibilityNN(nn.Module):
    """
    Domain-Heterogeneous Neural Network adapted from GVCL/Susceptibility-Mapping-FL-Hetero.
    Separates static geomorphic features from dynamic meteorological triggers for federated transfer.
    """
    def __init__(self, static_dim: int = 11, dynamic_dim: int = 1):
        super(HeteroSusceptibilityNN, self).__init__()
        # Static branch (DEM, slope, curvature, proximity, vegetation)
        self.static_net = nn.Sequential(
            nn.Linear(static_dim, 96),
            nn.BatchNorm1d(96),
            nn.ReLU(),
            nn.Dropout(0.25),
            nn.Linear(96, 48),
            nn.BatchNorm1d(48),
            nn.ReLU()
        )
        # Dynamic branch (Rainfall / GPM trigger)
        self.dynamic_net = nn.Sequential(
            nn.Linear(dynamic_dim, 32),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.BatchNorm1d(16),
            nn.ReLU()
        )
        # Combined fusion head
        self.fusion_head = nn.Sequential(
            nn.Linear(48 + 16, 32),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )

    def forward(self, x_static: torch.Tensor, x_dynamic: torch.Tensor) -> torch.Tensor:
        feat_static = self.static_net(x_static)
        feat_dynamic = self.dynamic_net(x_dynamic)
        combined = torch.cat([feat_static, feat_dynamic], dim=-1)
        return self.fusion_head(combined)


class GeospatialDataset(Dataset):
    """
    PyTorch Dataset for spatial multi-raster feature tensors and binary hazard labels.
    """
    def __init__(self, features: torch.Tensor, labels: torch.Tensor = None):
        if not isinstance(features, torch.Tensor):
            features = torch.tensor(features, dtype=torch.float32)
        self.features = features
        
        if labels is not None:
            if not isinstance(labels, torch.Tensor):
                labels = torch.tensor(labels, dtype=torch.float32)
            if labels.ndim == 1:
                labels = labels.unsqueeze(1)
            self.labels = labels
        else:
            self.labels = None

    def __len__(self) -> int:
        return len(self.features)

    def __getitem__(self, idx: int):
        if self.labels is not None:
            return self.features[idx], self.labels[idx]
        return self.features[idx]


def create_dataloaders(
    train_x, train_y,
    val_x, val_y,
    test_x=None, test_y=None,
    batch_size: int = 64,
    num_workers: int = 0
):
    """
    Factory helper to instantiate train, validation, and test PyTorch DataLoaders.
    """
    train_dataset = GeospatialDataset(train_x, train_y)
    val_dataset = GeospatialDataset(val_x, val_y)
    
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True,
        num_workers=num_workers,
        drop_last=False
    )
    val_loader = DataLoader(
        val_dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=num_workers
    )
    
    test_loader = None
    if test_x is not None and test_y is not None:
        test_dataset = GeospatialDataset(test_x, test_y)
        test_loader = DataLoader(
            test_dataset,
            batch_size=batch_size,
            shuffle=False,
            num_workers=num_workers
        )
        
    return train_loader, val_loader, test_loader


def quantize_model_for_inference(model: nn.Module) -> nn.Module:
    """
    Performs dynamic INT8 quantization on linear layers.
    Reduces memory footprint ~4x and enables sub-300ms CPU inference inside FastAPI.
    """
    model.eval()
    quantized_model = torch.quantization.quantize_dynamic(
        model,
        {nn.Linear},
        dtype=torch.qint8
    )
    return quantized_model
