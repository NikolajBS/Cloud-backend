provider "google" {
    project = "cloud-handin-project"
    region  = "us-central1"
}

resource "google_compute_address" "lb_ip" {
    name = "lb-ip"
}

// template instance 
resource "google_compute_instance_template" "instance_template" {
  name         = "my-instance-template"
  machine_type = "e2-medium"

  disk {
    source_image = "projects/cloud-handin-project/global/images/image-balance"  # Change to your image
  }

  network_interface {
    network = "default"
  }
}

// instance group 
resource "google_compute_instance_group_manager" "instance_group" {
  name           = "my-instance-group"
  base_instance_name = "instance-balance"
  target_size    = 1  # Set desired target size
  version {
    name = "my-version-1"
    instance_template = google_compute_instance_template.instance_template.self_link
  }
  named_port {
    name = "http"
    port = 80
  }
  zone = "us-central1-a"
}

// service 
resource "google_compute_backend_service" "backend_service" {
  name        = "backend-service"
  port_name   = "http"
  protocol    = "HTTP"
  timeout_sec = 10

  backend {
    group = google_compute_instance_group_manager.instance_group.instance_group
  }
  health_checks = [google_compute_health_check.health_check.self_link]
}


// health check
resource "google_compute_health_check" "health_check" {
  name               = "health-check"
  check_interval_sec = 10
  timeout_sec        = 5

  http_health_check {
    port        = 80
    request_path = "/"
  }
}

// target pool
resource "google_compute_target_pool" "target_pool" {
  name = "target-pool"

  health_checks = [google_compute_health_check.health_check.self_link]
 
  instances = ["https://www.googleapis.com/compute/v1/projects/cloud-handin-project/zones/us-central1-a/instances/instance-balance"]
}

// forwarding rule
resource "google_compute_forwarding_rule" "forwarding_rule" {
    name       = "forwarding-rule"
    ip_address = google_compute_address.lb_ip.address
    port_range = "80"
    target     = google_compute_target_pool.target_pool.self_link
}
// firewall
resource "google_compute_global_forwarding_rule" "global_forwarding_rule" {
    name       = "global-forwarding-rule"
    ip_address = google_compute_address.lb_ip.address
    port_range = "80"
    target     = google_compute_target_pool.target_pool.self_link
}

resource "google_compute_firewall" "firewall" {
    name    = "firewall"
    network = "default"

    allow {
        protocol = "tcp"
        ports    = ["80"]
    }

    source_ranges = []
}