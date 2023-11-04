#!/bin/bash
# variables

PROJECT_ID="cloud-handin-project"
REPO_NAME="docker-images"
IMAGE_NAME="backend-image"

# Read current version from version file
TAG=$(cat version.txt)

gcloud auth activate-service-account --key-file=4d0bbd5fa0ee0427f4be5dbfe4435ba31e25b792

# Authenticate Docker to push images to Artifact Registry
gcloud auth configure-docker "us-central1-docker.pkg.dev"

# Build Docker image with commit SHA as tag
docker build -t "us-central1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:$TAG" .

# Push Docker image to Artifact Registry
docker push "us-central1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/$IMAGE_NAME:$TAG"

# Extract major and minor version parts
MAJOR=$(echo $TAG | awk -F. '{print $1}' | sed 's/v//')
MINOR=$(echo $TAG | awk -F. '{print $2}')

# Increment minor version
((MINOR++))

# Generate next version
NEXT_TAG="v$MAJOR.$MINOR"

# Update version file
echo $NEXT_TAG > version.txt
