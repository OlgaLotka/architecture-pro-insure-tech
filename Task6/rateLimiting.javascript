http {
    limit_upstream_zone limit 32m;
    # Настройка upstream для балансировки нагрузки
    upstream backend_servers {
        server backend1.example.com;
        server backend2.example.com;
        server backend3.example.com;
        limit_upstream_conn limit=10 zone=limit backlog=10 timeout=5s;
    }
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
    server {
        listen 80;

        location / {
            limit_req zone=mylimit;
            limit_req_status 429;
            proxy_pass http://backend_servers;
        }

    }
}