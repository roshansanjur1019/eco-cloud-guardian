
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
  domain_name  = "skyspearsolutions.io"  # Using the actual domain name instead of environment.project.com
  
  # Using a proper ACM certificate
  acm_certificate_arn = "arn:aws:acm:us-east-1:000000000000:certificate/00000000-0000-0000-0000-000000000000"
  
  # CloudFront Configuration - improved caching for production
  cdn_ttl = {
    min     = 60      # 1 minute
    default = 3600    # 1 hour
    max     = 86400   # 24 hours
  }
  
  tags = {
    Environment = "test"
    ManagedBy   = "terraform"
    Product     = "SkySpear Cloud Governance Platform"
    Owner       = "SkySpear Solutions"
  }
}

# Configure additional outputs for the platform
output "platform_details" {
  description = "SkySpear platform configuration details"
  value = {
    platform_name    = "SkySpear Cloud Governance Platform"
    version          = "1.0.0"
    release_date     = "2025-05-15"
    supported_clouds = ["AWS", "Azure", "GCP"]
  }
}
