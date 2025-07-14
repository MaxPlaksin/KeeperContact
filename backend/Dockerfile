FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories
RUN mkdir -p /app/logs /app/photos

# Copy requirements and install
COPY requirements.txt ./
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

# Copy application code
COPY . .

# Set permissions
RUN chown -R 1000:1000 /app

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV UPLOAD_DIR=/app/photos

# Run as non-root user
USER 1000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]