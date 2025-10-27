---
title: Core Architecture
sidebar_position: 2
description: Comprehensive architecture overview of the MCP framework powering the Optical Network AI Copilot with dual-server system design
tags: [architecture, mcp, system-design]
keywords: [mcp framework, model context protocol, architecture, t-api, optical specialist, system design]
---

# Core Architecture: The MCP Framework

The solution is built on Anthropic's Model Context Protocol (MCP), which allows a Claude Client to connect to custom-defined resources and tools.

## System Architecture Overview

```mermaid title="MCP Framework Architecture"
graph TD
    subgraph "External User"
        C[Claude Client<br>e.g., Local App, Slack]
    end

    subgraph "AI Copilot MCP Servers (Internal)"
        subgraph "Server 1: T-API Gateway / Lab Manager"
            T1[Tool: get_service_status]
            T2[Tool: adjust_amplifier_power]
            T3[Tool: get_available_emulators]
            T4[Tool: replicate_client_issue]
        end

        subgraph "Server 2: Optical Specialist & Docs"
            K1[Resource: Equipment Manuals]
            K2[Resource: API Specifications]
            K3[Resource: Best Practices]
            K4[Resource: User Stories]
        end

        NMS[Network Management System<br>T-API Interface]
        LAB[Lab Emulators & Management API]
    end

    C -->|MCP Connection| T1
    C -->|MCP Connection| K1
    T1 -->|Calls| NMS
    T2 -->|Calls| NMS
    T3 -->|Calls| LAB
    T4 -->|Calls| LAB
    K1 -->|Provides Context| C
    K2 -->|Provides Context| C
    K3 -->|Provides Context| C
    K4 -->|Provides Context| C
```

:::info Architecture Layers
The system consists of three main layers: External User (Claude Client), MCP Servers (tools and knowledge), and Backend Systems (network and lab infrastructure).
:::
