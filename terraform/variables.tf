# variables.tf
variable "environment" {
  description = "The deployment environment"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

# Domain and DNS Configuration
variable "domain_name" {
  description = "Primary domain name for the application"
  type        = string
  default     = ""  # Empty default for environments without domain
}

variable "create_route53_zone" {
  description = "Whether to create a new Route53 zone"
  type        = bool
  default     = false
}

variable "route53_zone_id" {
  description = "Existing Route53 zone ID if not creating new one"
  type        = string
  default     = ""
}

variable "create_www_redirect" {
  description = "Whether to create a www redirect"
  type        = bool
  default     = false
}

# CloudFront Configuration
variable "cdn_ttl" {
  description = "CloudFront cache TTL settings"
  type        = map(number)
  default = {
    min     = 0
    default = 3600    # 1 hour
    max     = 86400   # 24 hours
  }
}

# Tags
variable "tags" {
  description = "Additional tags for resources"
  type        = map(string)
  default     = {}
}