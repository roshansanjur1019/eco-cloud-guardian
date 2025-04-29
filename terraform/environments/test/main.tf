terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "eco-cloud-guardian-terraform-state"
    key            = "test/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "eco-cloud-guardian-terraform-locks"
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