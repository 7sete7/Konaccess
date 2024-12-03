#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    source .env
fi

# Verify required variables are set
if [ -z "$B2_APPKEY_ID" ] || [ -z "$B2_APPKEY" ] || [ -z "$B2_BUCKET" ] || [ -z "$CLIENT" ] || [ -z "$TAG" ]; then
    echo "Error: Required environment variables are not set"
    echo "Please ensure B2_APPKEY_ID, B2_APPKEY, B2_BUCKET, CLIENT, and TAG are defined"
    exit 1
fi

sudo docker build \
  -t konectypro/konaccess:${TAG} \
  --build-arg B2_APPKEY_ID=${B2_APPKEY_ID} \
  --build-arg B2_APPKEY=${B2_APPKEY} \
  --build-arg B2_BUCKET=${B2_BUCKET} \
  --build-arg TARGET_DIR=${CLIENT} \
  --build-arg VITE_KONECTY_URL=${VITE_KONECTY_URL} \
  --build-arg VITE_KONECTY_TOKEN=${VITE_KONECTY_TOKEN} .
