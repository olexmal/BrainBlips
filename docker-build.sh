#!/bin/bash

# Docker Build Script for Docusaurus Documentation Site
# Usage: ./docker-build.sh [build|clean]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build production image
build() {
    print_status "Building production image..."
    docker build --target production -t docusaurus-prod .
    print_success "Production image built successfully!"
    print_status "To run: docker run -p 3000:3000 docusaurus-prod"
}

# Function to clean up Docker resources
clean() {
    print_status "Cleaning up Docker resources..."
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to show help
show_help() {
    echo "Docker Build Script for Docusaurus Documentation Site"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Build production image"
    echo "  clean     Clean up Docker resources"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build  # Build production image"
    echo "  $0 clean  # Clean up Docker resources"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        "build")
            build
            ;;
        "clean")
            clean
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"