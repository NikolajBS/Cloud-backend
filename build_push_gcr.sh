#!/bin/bash
# Define variables
PROJECT_ID="cloud-handin-project"
REPO_NAME="docker-images"
COMMIT_SHA=$(git rev-parse HEAD)

ARTIFACT_REGISTRY="us-central1-docker.pkg.dev/$PROJECT_ID/$REPO_NAME"

gcloud auth activate-service-account --key-file=371a6cce878c8d4e32c339510b7aab596ec71bd8

# Authenticate Docker to push images to Artifact Registry
gcloud auth configure-docker "us-central1-docker.pkg.dev"

# Build Docker image with commit SHA as tag
docker build -t $ARTIFACT_REGISTRY:$COMMIT_SHA .

# Push Docker image to Artifact Registry
docker push $ARTIFACT_REGISTRY:$COMMIT_SHA