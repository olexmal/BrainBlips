# Core Architecture: The MCP Framework

## Navigation
- [01 - Project Overview](Project%20Ideas/Optical%20Network%20AI%20Copilot/01%20-%20Project%20Overview)
- [03 - Network Operations Copilot](Project%20Ideas/Optical%20Network%20AI%20Copilot/03%20-%20Network%20Operations%20Copilot)
- [04 - Development Copilot](Project%20Ideas/Optical%20Network%20AI%20Copilot/04%20-%20Development%20Copilot)
- [05 - Implementation Roadmap](Project%20Ideas/Optical%20Network%20AI%20Copilot/05%20-%20Implementation%20Roadmap)
- [06 - Success Factors & Conclusion](Project%20Ideas/Optical%20Network%20AI%20Copilot/06%20-%20Success%20Factors%20%26%20Conclusion)

---

The solution is built on Anthropic's Model Context Protocol (MCP), which allows a Claude Client to connect to custom-defined resources and tools.

```mermaid
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

    C -->|MCP Connection| Server1
    C -->|MCP Connection| Server2
    Server1 -->|Calls| NMS
    Server1 -->|Calls| LAB
    Server2 -->|Reads| K1
    Server2 -->|Reads| K2
    Server2 -->|Reads| K3
    Server2 -->|Reads| K4
```
