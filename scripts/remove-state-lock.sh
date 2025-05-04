#!/bin/bash

# Set variables
TABLE_NAME="eco-cloud-guardian-tflocks-q0wmbvik"
LOCK_ID="eco-cloud-guardian-tfstate-q0wmbvik/test/terraform.tfstate"

# Remove the lock
aws dynamodb delete-item \
    --table-name "$TABLE_NAME" \
    --key "{\"LockID\": {\"S\": \"$LOCK_ID\"}}" \
    --region "us-west-2"

echo "Lock removed successfully" 