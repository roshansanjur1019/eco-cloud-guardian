#!/bin/bash

# Build the React application
echo "Building React application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed!"
    exit 1
fi

# If you have a specific S3 bucket, you can add sync command here
# aws s3 sync dist/ s3://your-bucket-name/

echo "Build process completed!" 