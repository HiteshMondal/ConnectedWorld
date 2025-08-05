variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "eu-north-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "The AMI ID for Ubuntu in your region"
  type        = string
  default     = "ami-042b4708b1d05f512"
}

variable "key_name" {
  description = "Name of your AWS EC2 Key Pair for SSH access"
  type        = string
}

variable "s3_bucket_name" {
  description = "Globally unique name for your S3 bucket"
  type        = string
}