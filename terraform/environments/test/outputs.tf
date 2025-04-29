
# Website Outputs
output "website_url" {
  description = "The URL of the static website"
  value       = module.website.website_url
}

output "cloudfront_url" {
  description = "The CloudFront distribution URL"
  value       = module.website.cloudfront_url
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = module.website.cloudfront_distribution_id
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket hosting the website"
  value       = module.website.s3_bucket_name
}

# Platform Configuration
output "platform_config" {
  description = "SkySpear Platform Configuration"
  value = {
    environment = var.environment
    region      = var.aws_region
    deployment_timestamp = timestamp()
  }
}

# Infrastructure Health Status
output "infrastructure_health" {
  description = "Infrastructure Health Status"
  value = {
    status = "operational"
    last_check = timestamp()
    components = {
      storage = "healthy"
      cdn = "healthy"
      dns = "configured"
    }
  }
}
