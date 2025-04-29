# Enterprise static hosting module variables

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (e.g., production, staging, development)"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name"
  type        = string
}

variable "cdn_ttl" {
  description = "CloudFront cache TTL settings"
  type        = map(number)
  default = {
    min     = 0
    default = 3600    # 1 hour
    max     = 86400   # 24 hours
  }
}

variable "acm_certificate_arn" {
  description = "ARN of ACM certificate for CloudFront distribution"
  type        = string
}

variable "waf_web_acl_arn" {
  description = "ARN of WAF Web ACL to attach to CloudFront"
  type        = string
  default     = null
}

variable "geo_restrictions" {
  description = "Geographic restrictions for content distribution"
  type = object({
    type      = string
    locations = list(string)
  })
  default = {
    type      = "none"
    locations = []
  }
}

variable "csp_allowed_domains" {
  description = "Domains to allow in Content Security Policy"
  type        = string
  default     = "https://*.amazonaws.com https://*.supabase.co"
}

# Monitoring and Alerting
variable "enable_monitoring" {
  description = "Enable CloudWatch monitoring and alerting"
  type        = bool
  default     = true
}

variable "error_threshold" {
  description = "Error rate threshold for CloudWatch alarms"
  type        = number
  default     = 5
}

# Backup Configuration
variable "enable_versioning" {
  description = "Enable S3 bucket versioning"
  type        = bool
  default     = true
}

variable "lifecycle_rules" {
  description = "Lifecycle rules for S3 objects"
  type = list(object({
    enabled = bool
    id      = string
    prefix  = string
    transitions = list(object({
      days          = number
      storage_class = string
    }))
    expiration = object({
      days = number
    })
  }))
  default = [
    {
      enabled = true
      id      = "cleanup-old-versions"
      prefix  = ""
      transitions = [
        {
          days          = 30
          storage_class = "STANDARD_IA"
        },
        {
          days          = 60
          storage_class = "GLACIER"
        }
      ]
      expiration = {
        days = 90
      }
    }
  ]
} 