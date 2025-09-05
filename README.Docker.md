# Docker Deployment Guide

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
  -p 3000:3000 \
  --restart unless-stopped \
  oto-macenauer-portfolio

# Or run in foreground to see logs
docker run -p 3000:3000 oto-macenauer-portfolio
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

### Environment Variables

You can customize the following environment variables:

- `NODE_ENV`: Set to 'production' for production builds
- `PORT`: The port the application runs on (default: 3000)
- `HOSTNAME`: The hostname to bind to (default: 0.0.0.0)

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

The container includes a health check that verifies the application is responding. You can check the health status with:

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