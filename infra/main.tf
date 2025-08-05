resource "aws_instance" "ubuntu" {
  ami           = "ami-042b4708b1d05f512"  # Use the correct AMI ID
  instance_type = var.instance_type

  tags = {
    Name = "ubuntu-instance"
  }
}
