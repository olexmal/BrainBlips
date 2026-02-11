# Docker Setup for Docusaurus Documentation Site

This project includes a multi-stage Docker setup optimized for production deployment.

## Docker Architecture

### Multi-Stage Build

The Dockerfile uses two stages:

1. **Builder Stage** (`node:20-alpine`)
   - Installs Node.js 20
   - Installs all dependencies via npm ci
   - Builds the Docusaurus site
   - Generates optimized static files

2. **Production Stage** (`nginx:alpine`)
   - Lightweight nginx server
   - Serves static files
   - Includes security headers
   - Optimized for performance

## Quick Start

### Using Docker Compose (from repo root)

```bash
docker-compose up --build
```

### Using Docker Commands (from website/ directory)

```bash
cd website

# Build production image
docker build --target production -t docusaurus-prod .

# Run production container
docker run -p 3000:3000 docusaurus-prod
```

### Using Build Script (from website/ directory)

```bash
cd website
chmod +x docker-build.sh

# Build production image
./docker-build.sh build

# Clean up
./docker-build.sh clean
```

## File Structure

```
website/
├── Dockerfile          # Multi-stage Docker configuration
├── nginx.conf          # Nginx configuration for production
├── .dockerignore       # Files to exclude from Docker build
├── docker-build.sh     # Build script
└── README-Docker.md    # This file

(Repo root)
├── docker-compose.yml  # Docker Compose configuration
```

## Configuration

### Ports

- **3000**: Main application port

### Environment Variables

- `NODE_ENV`: Set to `production` in the container

## Security Features

- Non-root user execution
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- Content Security Policy
- Optimized nginx configuration

## Performance Optimizations

- Multi-stage build reduces final image size
- Gzip compression enabled
- Static asset caching (1 year)
- HTML caching (1 hour)
- Alpine Linux base images for minimal size

## Troubleshooting

### Port already in use

```bash
# Use different port
docker run -p 3001:3000 docusaurus-prod
```

### Build failures

```bash
cd website
docker builder prune -f
docker build --no-cache --target production -t docusaurus-prod .
```
