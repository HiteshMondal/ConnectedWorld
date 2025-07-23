resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"  # Use the correct AMI ID
  instance_type = var.instance_type

  tags = {
    Name = "example-instance"
  }
}
