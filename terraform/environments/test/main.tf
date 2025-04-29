terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Note: The backend values need to be updated after running terraform output in the bootstrap directory
  backend "s3" {
    bucket         = "BUCKET_NAME_PLACEHOLDER"  # This will be replaced with actual value after bootstrap
    key            = "test/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "TABLE_NAME_PLACEHOLDER"   # This will be replaced with actual value after bootstrap
  }
}

provider "aws" {
  region = var.aws_region
}

# Static hosting configuration
module "website" {
  source = "../../"
  
  environment  = var.environment
  project_name = var.project_name
  aws_region   = var.aws_region
  
  # CloudFront Configuration - shorter TTL for testing
  cdn_ttl = {
    min     = 0
    default = 60     # 1 minute
    max     = 3600   # 1 hour
  }
  
  tags = {
    Environment = "test"
    ManagedBy   = "terraform"
  }
}