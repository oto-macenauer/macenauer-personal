# Docker Deployment Guide

The image is a two-stage build: Node compiles the Astro site to static files,
then `nginxinc/nginx-unprivileged:alpine` serves `dist/`. There is no Node
process at runtime. nginx runs as a non-root user and listens on **8080**
inside the container, published as **3000** on the host.

## Building and Running with Docker

### Prerequisites
- Docker installed on your system
- Docker Compose (optional, for easier management)

### Build the Docker Image

```bash
# Build the image
docker build -t oto-macenauer-portfolio .
```

### Run the Container

#### Option 1: Using Docker directly
```bash
# Run in detached mode
docker run -d \
  --name portfolio-website \
  -p 3000:8080 \
  --restart unless-stopped \
  oto-macenauer-portfolio

# Or run in foreground to see logs
docker run -p 3000:8080 oto-macenauer-portfolio
```

#### Option 2: Using Docker Compose (Recommended)
```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

### Access the Application
Open your browser and navigate to:
- http://localhost:3000

### Production Deployment

For production deployment, consider:

1. **Using a reverse proxy** (nginx, traefik, etc.)
2. **Adding SSL/TLS certificates**
3. **Setting up proper environment variables**
4. **Using a container orchestration platform** (Kubernetes, Docker Swarm, etc.)

### Configuration

The runtime is nginx serving static files, so there are no application
environment variables. Runtime behaviour — security headers, gzip, cache
policy, and 404 handling — is configured in `nginx.conf`, which is copied to
`/etc/nginx/conf.d/default.conf` in the image.

The canonical site URL used for the sitemap and canonical tags is a **build
time** value, set as `site` in `astro.config.mjs`.

To change the published port, edit the mapping in `docker-compose.yml`
(`"3000:8080"`). The container port stays 8080 — the unprivileged nginx user
cannot bind to a port below 1024.

### Building for Different Architectures

```bash
# Build for ARM64 (e.g., Apple Silicon, AWS Graviton)
docker buildx build --platform linux/arm64 -t oto-macenauer-portfolio:arm64 .

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t oto-macenauer-portfolio:multiarch .
```

### Pushing to a Registry

```bash
# Tag the image
docker tag oto-macenauer-portfolio:latest your-registry/oto-macenauer-portfolio:latest

# Push to registry
docker push your-registry/oto-macenauer-portfolio:latest
```

### Health Check

The container includes a health check that requests `http://127.0.0.1:8080/`.
It uses the literal IPv4 address rather than `localhost`, because nginx binds
IPv4 only while busybox `wget` resolves `localhost` to `::1` first — which
would fail with "connection refused" and mark a working container unhealthy.

You can check the health status with:

```bash
docker ps
docker inspect portfolio-website --format='{{json .State.Health}}'
```

### Troubleshooting

1. **Check logs:**
   ```bash
   docker logs portfolio-website
   ```

2. **Enter the container:**
   ```bash
   docker exec -it portfolio-website sh
   ```

3. **Check resource usage:**
   ```bash
   docker stats portfolio-website
   ```

4. **Rebuild without cache:**
   ```bash
   docker build --no-cache -t oto-macenauer-portfolio .
   ```