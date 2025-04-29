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
  source = "../../modules/static-hosting"
  
  environment  = var.environment
  project_name = var.project_name
  domain_name  = "${var.environment}.${var.project_name}.com"  # Temporary domain for testing
  
  # Using a self-signed certificate for testing
  acm_certificate_arn = "arn:aws:acm:us-east-1:000000000000:certificate/00000000-0000-0000-0000-000000000000"
  
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