output "instance_id" {
  value = aws_instance.ubuntu.id
}

output "instance_public_ip" {
  value = aws_instance.ubuntu.public_ip
}

output "s3_bucket_name" {
  value = aws_s3_bucket.my_bucket.id
}