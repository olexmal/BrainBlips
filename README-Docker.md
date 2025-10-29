# Docker Setup for Docusaurus Documentation Site

This project includes a multi-stage Docker setup optimized for both development and production environments.

## 🐳 Docker Architecture

### Multi-Stage Build

The Dockerfile uses two stages:

1. **Builder Stage** (`node:20-alpine`)
   - Installs Node.js 20 and pnpm
   - Installs all dependencies
   - Builds the Docusaurus site
   - Generates optimized static files

2. **Production Stage** (`nginx:alpine`)
   - Lightweight nginx server
   - Serves static files
   - Includes security headers
   - Optimized for performance

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Development mode
docker-compose --profile dev up

# Production mode
docker-compose --profile prod up

# Build only
docker-compose --profile build up
```

### Using Docker Commands

```bash
# Build development image
docker build --target builder -t docusaurus-dev .

# Build production image
docker build --target production -t docusaurus-prod .

# Run development container
docker run -p 3000:3000 -v $(pwd):/app docusaurus-dev

# Run production container
docker run -p 3000:3000 docusaurus-prod
```

### Using Build Script

```bash
# Make script executable (first time only)
chmod +x docker-build.sh

# Build development image
./docker-build.sh dev

# Build production image
./docker-build.sh prod

# Build both images
./docker-build.sh build

# Run development container
./docker-build.sh run-dev

# Run production container
./docker-build.sh run-prod
```

## 📁 File Structure

```
├── Dockerfile              # Multi-stage Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── docker-build.sh         # Build script with helper functions
├── nginx.conf             # Nginx configuration for production
├── .dockerignore           # Files to exclude from Docker build
└── README-Docker.md        # This file
```

## 🔧 Configuration

### Environment Variables

- `NODE_ENV`: Set to `development` or `production`

### Ports

- **3000**: Main application port (both dev and prod)

### Volumes

- **Development**: Mount current directory to `/app` for live reload
- **Production**: Static files served from `/usr/share/nginx/html`

## 🛡️ Security Features

- Non-root user execution
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Content Security Policy
- Optimized nginx configuration

## ⚡ Performance Optimizations

- Multi-stage build reduces final image size
- Gzip compression enabled
- Static asset caching (1 year)
- HTML caching (1 hour)
- Alpine Linux base images for minimal size

## 🧹 Cleanup

```bash
# Clean up Docker resources
./docker-build.sh cleanup

# Or manually
docker system prune -f
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 3000
   lsof -i :3000
   
   # Use different port
   docker run -p 3001:3000 docusaurus-prod
   ```

2. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Build failures**
   ```bash
   # Clean Docker cache
   docker builder prune -f
   
   # Rebuild without cache
   docker build --no-cache --target production -t docusaurus-prod .
   ```

### Debugging

```bash
# Run container with shell access
docker run -it --entrypoint /bin/sh docusaurus-prod

# Check container logs
docker logs <container_id>

# Inspect image layers
docker history docusaurus-prod
```

## 📊 Image Sizes

- **Builder stage**: ~500MB (includes Node.js and dependencies)
- **Production stage**: ~50MB (nginx + static files only)

## 🌐 Production Deployment

### Docker Hub

```bash
# Tag and push to Docker Hub
docker tag docusaurus-prod yourusername/docusaurus:latest
docker push yourusername/docusaurus:latest
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: docusaurus
spec:
  replicas: 3
  selector:
    matchLabels:
      app: docusaurus
  template:
    metadata:
      labels:
        app: docusaurus
    spec:
      containers:
      - name: docusaurus
        image: yourusername/docusaurus:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Build Docker image
      run: docker build --target production -t docusaurus-prod .
    - name: Deploy
      run: # Your deployment commands here
```

## 📝 Notes

- The production image is optimized for serving static files
- Development image includes live reload capabilities
- All security best practices are implemented
- The setup follows Docker and nginx best practices
