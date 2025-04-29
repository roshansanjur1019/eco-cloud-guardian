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
  value       = module.website.website_url
}