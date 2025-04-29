terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "local" {}  # Using local backend for simplicity since we're using Supabase for database
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