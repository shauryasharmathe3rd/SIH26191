# ==============================================================================
# RESITE-GIS FastAPI Backend Multi-Stage Production Dockerfile
# Optimized for AWS Low-Cost Deployment (t4g.small / Lightsail / App Runner)
# ==============================================================================

# Stage 1: Build Dependencies
FROM python:3.11-slim-bookworm AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libgeos-dev \
    libgdal-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .

RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Production Runtime Stage
FROM python:3.11-slim-bookworm AS runner

WORKDIR /app

# Install minimal runtime libraries for C spatial extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgeos-c1v5 \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder
COPY --from=builder /root/.local /root/.local

ENV PATH=/root/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    ENVIRONMENT=production

# Copy application code and lightweight runtime processed GIS vector datasets (~10MB)
COPY backend/app ./app
COPY backend/main.py ./main.py
COPY backend/data_pipeline/processed ./data_pipeline/processed

EXPOSE 8000

# AWS container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

# Production uvicorn execution with 2 workers (suitable for 1GB-2GB RAM instances)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2", "--limit-concurrency", "50"]
