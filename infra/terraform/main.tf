provider "aws" {
  region = "us-west-2"  # Replace with your preferred region
}

data "aws_security_group" "existing_sg" {
  name = "launch-wizard-1"  # Replace with your security group name
}

resource "aws_lb_target_group" "gateway_tg" {
  name     = "gatewayTG"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id  # Ensure you specify the correct VPC ID
  target_type = "ip"     # Assuming your targets are IP addresses
}

resource "aws_lb_target_group_attachment" "gateway_tg_attach" {
  target_group_arn = aws_lb_target_group.gateway_tg.arn
  target_id        = aws_instance.app_server.private_ip  # Private IP
  port             = 80
}

resource "aws_instance" "app_server" {
  ami           = "ami-0a38c1c38a15fed74"  # Amazon Linux 2 AMI
  instance_type = "t2.micro"

  key_name = var.key_name  # Replace with your SSH key name

  vpc_security_group_ids = [data.aws_security_group.existing_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y

              # Install Docker
              sudo yum install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user

              # Enable Docker to start on boot
              sudo systemctl enable docker

              # Install git
              sudo yum install -y git

              # Clone your private repository using PAT
              git clone https://Morwasi:${var.github_token}@github.com/Morwasi/K3rn3IP-n-c.git /home/ec2-user/app

              # Change to the app directory
              cd /home/ec2-user/app

              # Build Docker image from Dockerfile
              sudo docker build -t campus-gateway-server .

              # Run the Docker container with auto-restart
              sudo docker run -d --restart unless-stopped -p 80:80 campus-gateway-server

              EOF

  tags = {
    Name = "GatewayServer"
  }

  lifecycle {
    create_before_destroy = true  # Create new instance before destroying old one
  }
}

# Associate an existing Elastic IP with the instance
resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.app_server.id
  allocation_id = "eipalloc-0b5d8ba887abeb34a"  # Use your actual Elastic IP allocation ID
}

output "instance_ip" {
  value = aws_instance.app_server.public_ip
}