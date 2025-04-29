# Test environment variables
variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "eco-cloud-guardian"
}

variable "environment" {
  description = "The deployment environment"
  type        = string
  default     = "test"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones to use"
  type        = list(string)
  default     = ["us-west-2a", "us-west-2b"]
}

variable "db_password" {
  description = "Password for the MongoDB database"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "Secret key for JWT authentication"
  type        = string
  sensitive   = true
}

variable "backend_container_tag" {
  description = "The tag of the backend container image to deploy"
  type        = string
  default     = "latest"
}

variable "frontend_container_tag" {
  description = "The tag of the frontend container image to deploy"
  type        = string
  default     = "latest"
}