# Temporary resource definitions for import
resource "aws_ecr_repository" "backend" {
  name = "${var.project_name}-${var.environment}-backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "${var.project_name}-${var.environment}-frontend"
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-${var.environment}"
}

# MongoDB Security Group
resource "aws_security_group" "mongodb" {
  name = "${var.project_name}-${var.environment}-mongodb"
  vpc_id = module.vpc.vpc_id
} 