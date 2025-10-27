---
title: Cursor Setup
sidebar_position: 2
---

# Cursor IDE Setup for Note-Taking and Research

This document explains the complete Cursor IDE configuration for the BrainBlips project, optimized for note-taking, research, and knowledge management.

## Overview

The BrainBlips workspace is configured as a hybrid development and knowledge management environment using Cursor IDE with Obsidian integration and Model Context Protocol (MCP) servers for enhanced AI capabilities.

## Project Configuration

### Basic Settings

```json
{
  "projectName": "BrainBlips",
  "defaultLanguage": "markdown",
  "framework": "obsidian",
  "packageManager": "none",
  "rootDirectory": ".",
  "sourceDirectory": ".",
  "buildDirectory": ".",
  "testDirectory": "."
}
```

**Key Configuration Details:**
- **Project Name**: BrainBlips
- **Default Language**: Markdown (optimized for note-taking)
- **Framework**: Obsidian (for knowledge graph and note management)
- **Package Manager**: None (pure markdown-based project)

## File Organization

### Include Patterns
The workspace is configured to include:

```
Docker/**/*          # Docker documentation and configurations
images/**/*          # Images and media files
.cursor/**/*         # Cursor IDE configuration
.obsidian/**/*       # Obsidian vault configuration
*.md                 # All markdown files
*.json               # JSON configuration files
*.yml, *.yaml        # YAML configuration files
*.png, *.jpg, *.jpeg # Image files
*.gif, *.svg         # Additional image formats
```

### Exclude Patterns
The following are excluded from indexing:

```
node_modules/**/*    # Node.js dependencies
target/**/*          # Build targets
dist/**/*           # Distribution files
.next/**/*          # Next.js build files
build/**/*          # Build artifacts
*.log               # Log files
*.tmp               # Temporary files
.git/**/*           # Git repository data
```

## Current Directory Structure

```
BrainBlips/
├── AI/
│   └── LM Studio/
│       └── Enhancing DeepSeek R1 Distill Qwen 7B with MCP.md
├── Docker/
│   ├── Install Docker Compose in Ubuntu 24.04.md
│   ├── Install Docker in Ubuntu 24.04.md
│   └── Introduction.md
├── images/
│   └── favicon.png
├── docs/
│   ├── README.md
│   ├── cursor-setup.md
│   ├── project-structure.md
│   └── mcp-servers.md
├── .cursor/
│   └── settings.json
└── .obsidian/
    ├── workspace.json
    ├── graph.json
    └── app.json
```

## MCP Servers Configuration

The workspace includes several Model Context Protocol (MCP) servers for enhanced functionality:

### 1. Sequential Thinking Server
```json
"sequential-thinking": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```
**Purpose**: Provides structured thinking capabilities for complex problem-solving and research analysis.

### 2. Filesystem Server
```json
"filesystem": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "D:\\Google Drive\\BrainBlips"]
}
```
**Purpose**: Enables AI to interact with the local filesystem for file operations and content management.

### 3. Git Server
```json
"git": {
  "command": "npx", 
  "args": ["-y", "@modelcontextprotocol/server-git", "--repository", "D:\\Google Drive\\BrainBlips"]
}
```
**Purpose**: Provides Git integration for version control and collaboration features.

### 4. Web Search Server
```json
"web-search": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-web-search"]
}
```
**Purpose**: Enables web search capabilities for research and fact-checking.

### 5. Memory Server
```json
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```
**Purpose**: Provides persistent memory capabilities for maintaining context across sessions.

### 6. Docker Server
```json
"docker": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-docker"]
}
```
**Purpose**: Enables Docker container management and development environment setup.

## Obsidian Integration

The workspace is configured to work with Obsidian for:

- **Knowledge Graph**: Visual representation of note connections
- **Note Linking**: Bidirectional linking between notes
- **Plugin Support**: Access to Obsidian's extensive plugin ecosystem
- **Vault Management**: Organized note storage and retrieval

### Obsidian Configuration Files
- `workspace.json`: Workspace layout and open files
- `graph.json`: Knowledge graph configuration
- `app.json`: Application settings

## Workflow for Note-Taking and Research

### 1. Creating New Notes
- Use Cursor's markdown support for creating structured notes
- Leverage Obsidian's linking syntax for connecting ideas
- Utilize the filesystem MCP server for automated file operations

### 2. Research Process
- Use the web search MCP server for gathering information
- Apply sequential thinking for complex analysis
- Store research findings in organized markdown files

### 3. Knowledge Management
- Create topic-based folders (AI, Docker, etc.)
- Use consistent naming conventions
- Leverage Obsidian's graph view for discovering connections

### 4. Version Control
- Git integration for tracking changes
- Commit research notes and documentation
- Collaborate using Git workflows

## Best Practices

### File Naming
- Use descriptive, kebab-case names for files
- Include dates for time-sensitive content
- Use consistent prefixes for different content types

### Content Organization
- Group related content in folders
- Use markdown headers for structure
- Include metadata in frontmatter when needed

### AI Integration
- Leverage MCP servers for enhanced capabilities
- Use sequential thinking for complex problems
- Maintain context with the memory server

## Troubleshooting

### Common Issues
1. **MCP Server Connection**: Ensure all required packages are installed
2. **File Permissions**: Check write permissions for the workspace directory
3. **Obsidian Sync**: Verify Obsidian vault is properly configured

### Performance Optimization
- Exclude unnecessary files from indexing
- Use appropriate file patterns for your content
- Regularly clean up temporary files

## Future Enhancements

Potential improvements to consider:
- Additional MCP servers for specific domains
- Automated note templates
- Integration with external knowledge bases
- Advanced search capabilities
- Collaborative features

---

*This setup provides a powerful environment for knowledge management, research, and development using modern AI-assisted tools.*
