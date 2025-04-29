# DNS module outputs

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.main.arn
}

output "route53_zone_id" {
  description = "ID of the Route53 zone"
  value       = var.create_route53_zone ? aws_route53_zone.main[0].id : var.route53_zone_id
}

output "domain_name" {
  description = "Domain name"
  value       = var.domain_name
}

output "nameservers" {
  description = "Nameservers for the domain (only if zone was created)"
  value       = var.create_route53_zone ? aws_route53_zone.main[0].name_servers : []
} 