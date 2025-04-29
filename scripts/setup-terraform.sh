#!/bin/bash

echo "Setting up Terraform infrastructure..."

# Step 1: Initialize and apply bootstrap configuration
cd terraform/bootstrap
terraform init
terraform apply -auto-approve

# Step 2: Get the generated bucket and table names
BUCKET_NAME=$(terraform output -raw state_bucket_name)
TABLE_NAME=$(terraform output -raw dynamodb_table_name)

echo "Generated bucket name: $BUCKET_NAME"
echo "Generated table name: $TABLE_NAME"

# Step 3: Update the backend configuration
cd ../environments/test
sed -i '' "s/BUCKET_NAME_PLACEHOLDER/$BUCKET_NAME/" main.tf
sed -i '' "s/TABLE_NAME_PLACEHOLDER/$TABLE_NAME/" main.tf

echo "Backend configuration updated with generated names"
echo "You can now run the main deployment workflow" 