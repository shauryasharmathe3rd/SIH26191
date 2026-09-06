#!/usr/bin/env python3
"""
S3 Geospatial Data Sync Utility for RESITE-GIS
Used in production/CI/CD to upload raw datasets to S3 and download runtime-processed
vector GeoJSONs/scalers on container startup.
"""
import os
import sys
import argparse
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PROCESSED_DIR = ROOT_DIR / "data_pipeline" / "processed"
RAW_DIR = ROOT_DIR / "data_pipeline" / "raw"

# Minimal runtime files needed by FastAPI backend (~10 MB total)
RUNTIME_FILES = [
    "red_zones_dynamic.geojson",
    "chamoli_waterways.geojson",
    "safe_relocation_sites.geojson",
    "resettlement_priority_queue.geojson",
    "dataset_summary.json",
    "scaler_params.json",
    "scaler.joblib",
]

def download_runtime_data(bucket_name: str, prefix: str = "runtime-processed"):
    """Downloads minimal runtime files from S3 to local processed directory."""
    try:
        import boto3
        from botocore.exceptions import ClientError
    except ImportError:
        print("[ERROR] boto3 is not installed. Install with: pip install boto3")
        sys.exit(1)

    s3 = boto3.client("s3")
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    print(f"[*] Syncing runtime data from s3://{bucket_name}/{prefix} -> {PROCESSED_DIR}")

    for filename in RUNTIME_FILES:
        target_path = PROCESSED_DIR / filename
        s3_key = f"{prefix}/{filename}"
        if target_path.exists():
            print(f" [SKIP] {filename} already exists locally.")
            continue
        try:
            print(f" [DOWNLOADING] {s3_key} -> {target_path} ...")
            s3.download_file(bucket_name, s3_key, str(target_path))
            print(f" [OK] {filename}")
        except ClientError as e:
            print(f" [WARNING] Could not download {s3_key}: {e}")

def upload_raw_to_s3(bucket_name: str, prefix: str = "raw-datasets"):
    """Uploads local raw datasets (>3GB) to S3 to offload storage."""
    try:
        import boto3
    except ImportError:
        print("[ERROR] boto3 is not installed. Install with: pip install boto3")
        sys.exit(1)

    s3 = boto3.client("s3")
    if not RAW_DIR.exists():
        print(f"[INFO] No raw directory found at {RAW_DIR}")
        return

    print(f"[*] Uploading raw datasets from {RAW_DIR} -> s3://{bucket_name}/{prefix}")
    for root, _, files in os.walk(RAW_DIR):
        for file in files:
            full_path = Path(root) / file
            rel_path = full_path.relative_to(RAW_DIR)
            s3_key = f"{prefix}/{rel_path}"
            print(f" [UPLOADING] {full_path.name} ({full_path.stat().st_size / (1024*1024):.1f} MB) -> {s3_key} ...")
            s3.upload_file(str(full_path), bucket_name, s3_key)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="RESITE-GIS S3 Data Synchronization")
    parser.add_argument("action", choices=["pull-runtime", "push-raw"], help="Action to perform")
    parser.add_argument("--bucket", default=os.getenv("S3_BUCKET_NAME", "resite-gis-storage"), help="Target S3 Bucket")
    args = parser.parse_args()

    if args.action == "pull-runtime":
        download_runtime_data(args.bucket)
    elif args.action == "push-raw":
        upload_raw_to_s3(args.bucket)
