terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "eco-cloud-guardian-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "eco-cloud-guardian-terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
}

# Production environment configuration
module "prod" {
  source = "../../"
  
  environment = "production"
  project_name = var.project_name
  aws_region = var.aws_region
  domain_name = var.domain_name
  
  # DNS Configuration
  create_route53_zone = true
  create_www_redirect = true
  
  # CloudFront Configuration
  cdn_ttl = {
    min     = 0
    default = 3600    # 1 hour
    max     = 86400   # 24 hours
  }
  
  tags = {
    Environment = "production"
    ManagedBy  = "terraform"
  }
} 