---
title: Project Structure
sidebar_position: 4
---

# BrainBlips Project Structure

This document outlines the organization and structure of the BrainBlips knowledge management workspace.

## Overview

BrainBlips is organized as a hybrid development and knowledge management environment, combining the power of Cursor IDE with Obsidian's note-taking capabilities and AI-enhanced research tools.

## Directory Structure

```
BrainBlips/
├── 📁 AI/                          # Artificial Intelligence content
│   └── 📁 LM Studio/               # LM Studio configurations and guides
│       └── 📄 Enhancing DeepSeek R1 Distill Qwen 7B with MCP.md
├── 📁 Docker/                      # Docker documentation and guides
│   ├── 📄 Install Docker Compose in Ubuntu 24.04.md
│   ├── 📄 Install Docker in Ubuntu 24.04.md
│   └── 📄 Introduction.md
├── 📁 images/                      # Media assets
│   └── 🖼️ favicon.png
├── 📁 docs/                        # Project documentation
│   ├── 📄 README.md
│   ├── 📄 cursor-setup.md
│   ├── 📄 project-structure.md
│   └── 📄 mcp-servers.md
├── 📁 .cursor/                     # Cursor IDE configuration
│   └── ⚙️ settings.json
└── 📁 .obsidian/                   # Obsidian vault configuration
    ├── ⚙️ workspace.json
    ├── ⚙️ graph.json
    └── ⚙️ app.json
```

## Content Categories

### 🤖 AI/ - Artificial Intelligence
**Purpose**: Documentation and guides related to AI tools, models, and configurations.

**Current Content**:
- **LM Studio/**: Local model management and MCP integration guides
  - DeepSeek R1 Distill Qwen 7B configuration with MCP

**Future Expansion**:
- Model comparison guides
- AI tool tutorials
- Research papers and summaries
- Prompt engineering resources

### 🐳 Docker/ - Containerization
**Purpose**: Docker-related documentation, installation guides, and best practices.

**Current Content**:
- Ubuntu 24.04 Docker installation guide
- Docker Compose setup instructions
- General Docker introduction

**Future Expansion**:
- Docker best practices
- Container orchestration guides
- Development environment setups
- Production deployment strategies

### 🖼️ images/ - Media Assets
**Purpose**: Visual content, diagrams, and media files used throughout the project.

**Current Content**:
- Project favicon

**Future Expansion**:
- Architecture diagrams
- Screenshots and tutorials
- Icons and graphics
- Documentation images

### 📚 docs/ - Documentation
**Purpose**: Project documentation, setup guides, and configuration references.

**Current Content**:
- **README.md**: Project overview and quick start guide
- **cursor-setup.md**: Complete Cursor IDE configuration guide
- **project-structure.md**: This file - project organization overview
- **mcp-servers.md**: Model Context Protocol servers documentation

**Future Expansion**:
- API documentation
- User guides
- Troubleshooting guides
- Contributing guidelines

## Configuration Files

### ⚙️ .cursor/ - Cursor IDE Configuration
**settings.json**: Main configuration file containing:
- Project metadata (name, language, framework)
- File inclusion/exclusion patterns
- MCP server configurations
- Directory structure definitions

### ⚙️ .obsidian/ - Obsidian Vault Configuration
**workspace.json**: Workspace layout and open files configuration
**graph.json**: Knowledge graph visualization settings
**app.json**: Application-level settings and preferences

## File Naming Conventions

### Markdown Files
- **Descriptive names**: Use clear, descriptive filenames
- **Kebab-case**: Use hyphens to separate words (e.g., `install-docker-compose.md`)
- **Hierarchical organization**: Group related content in folders

### Configuration Files
- **Standard extensions**: Use appropriate file extensions (.json, .yml, .yaml)
- **Descriptive names**: Clear indication of file purpose
- **Consistent structure**: Follow established patterns

## Content Organization Principles

### 1. Topic-Based Grouping
Content is organized by subject matter rather than file type, making it easier to find related information.

### 2. Hierarchical Structure
Multi-level folder organization allows for both broad categorization and specific topics.

### 3. Consistent Naming
Standardized naming conventions improve discoverability and maintainability.

### 4. Documentation Co-location
Documentation is kept close to the code/content it describes.

## Integration Points

### Cursor IDE Integration
- **File indexing**: Configured to include all relevant content types
- **MCP servers**: Enhanced AI capabilities for content creation and research
- **Git integration**: Version control for all content

### Obsidian Integration
- **Knowledge graph**: Visual representation of content relationships
- **Note linking**: Bidirectional links between related content
- **Plugin ecosystem**: Access to Obsidian's extensive plugin library

### AI Enhancement
- **Sequential thinking**: Complex problem-solving capabilities
- **Web search**: Research and fact-checking integration
- **Memory persistence**: Context maintenance across sessions

## Future Structure Considerations

### Planned Additions
- **Research/**: Dedicated research notes and findings
- **Templates/**: Reusable note and document templates
- **Archive/**: Historical content and deprecated information
- **Projects/**: Active project documentation

### Scalability
The current structure is designed to scale with additional content while maintaining organization and discoverability.

## Maintenance Guidelines

### Regular Tasks
1. **Review file organization**: Ensure content is properly categorized
2. **Update documentation**: Keep setup guides current
3. **Clean up unused files**: Remove outdated content
4. **Optimize structure**: Reorganize as needed for better navigation

### Content Standards
1. **Consistent formatting**: Follow markdown best practices
2. **Clear structure**: Use headers and lists for readability
3. **Descriptive content**: Write clear, informative descriptions
4. **Regular updates**: Keep content current and relevant

---

*This structure provides a solid foundation for knowledge management while remaining flexible enough to adapt to changing needs and content types.*
