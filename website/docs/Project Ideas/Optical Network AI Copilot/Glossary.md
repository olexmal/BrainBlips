---
title: Glossary
sidebar_position: 99
sidebar_label: Glossary
description: Comprehensive glossary of optical networking and AI Copilot terminology
tags: [glossary, reference, terminology]
keywords: [glossary, optical network, terminology, definitions, mcp, ai copilot]
---

# Glossary

## AI & MCP Terms

### AI Copilot
An AI-powered assistant that helps users perform complex tasks through natural language interaction, combining large language models with domain-specific tools and knowledge.

### Claude Client
The user interface application that leverages Anthropic's Claude language model to provide conversational interaction with technical systems.

### Human-in-the-Loop (HITL)
A safety pattern where human operators must explicitly approve critical actions before they are executed by the AI system.

### Large Language Model (LLM)
A type of AI model trained on vast amounts of text data to understand and generate human language, forming the basis of conversational AI systems.

### Model Context Protocol (MCP)
An open protocol developed by Anthropic that enables AI assistants to securely connect to external data sources and tools, providing a standardized way for AI systems to interact with various resources.

### MCP Server
A server application that implements the MCP protocol, exposing tools (functions) and resources (data) that Claude can access and use.

### Tool
In MCP terminology, a callable function that the AI can execute to perform actions or retrieve information (e.g., `get_service_status`, `adjust_amplifier_power`).

### Resource
In MCP terminology, a data source or knowledge base that the AI can query for information (e.g., equipment manuals, API specifications).

## Optical Network Terms

### Amplifier
An optical device that boosts the strength of optical signals to compensate for loss over long distances.

### BER (Bit Error Rate)
The ratio of bits received in error compared to the total number of bits transmitted, indicating link quality.

### Chromatic Dispersion
The phenomenon where different wavelengths of light travel at different speeds through fiber, causing signal spreading and degradation.

### E-Line Service
An Ethernet point-to-point service that provides dedicated bandwidth between two locations.

### FEC (Forward Error Correction)
A technique that adds redundant data to transmitted signals, allowing receivers to detect and correct errors without retransmission.

### Line Card
A modular circuit board that plugs into a network device chassis, providing optical transmission and reception capabilities.

### Modulation
The technique used to encode data onto optical signals, with higher-order modulations (e.g., 16-QAM, 64-QAM) supporting higher data rates.

### NMS (Network Management System)
Software platform for monitoring, configuring, and managing network infrastructure.

### OSNR (Optical Signal-to-Noise Ratio)
The ratio of signal power to noise power in an optical system, measured in dB. Higher OSNR indicates better signal quality.

### POP (Point of Presence)
A physical location where network equipment is installed to provide service access to customers.

### Q-Factor
A measure of signal quality that combines OSNR and other impairments. Higher Q-factor indicates better performance.

### ROADM (Reconfigurable Optical Add-Drop Multiplexer)
An optical device that can dynamically route different wavelengths of light to different destinations without optical-to-electrical conversion.

### Service Provisioning
The process of configuring network equipment to create and activate a new customer service.

### Span
A section of optical fiber between two amplifier sites or network nodes.

### T-API (Transport API)
A standardized northbound API for managing transport networks, based on open standards for interoperability.

### Transponder
A device that converts electrical signals to optical signals (and vice versa) for transmission over fiber optic networks.

### Wavelength
A specific frequency of light used to carry data in a DWDM (Dense Wavelength Division Multiplexing) optical network.

### 800G-ZR
An industry-standard coherent optical transmission technology operating at 800 Gbps, designed for data center interconnect applications.

## Network Operations Terms

### Dry-Run
A simulation or test execution of a command that shows what would happen without actually making changes to the live network.

### Provisioning
The process of configuring network services and resources to meet customer requirements.

### Remediation
The process of fixing identified network issues or problems.

### Rollback
The process of reverting network configuration changes to a previous known-good state.

### Telemetry
Real-time performance and status data collected from network devices.

### Topology
The physical and logical arrangement of network devices and their interconnections.

### Troubleshooting
The systematic process of diagnosing and resolving network problems.

## Development & Testing Terms

### Emulator
A software or hardware system that mimics the behavior of real network equipment for testing and development purposes.

### Lab Manager
The MCP server responsible for managing development and test lab environments.

### Lab Pod
A collection of network equipment in a test laboratory configured for specific testing scenarios.

### Protected Service
A network service with redundancy, typically using 1+1 protection where traffic is sent simultaneously over primary and backup paths.

### T-API Gateway
The MCP server that provides controlled access to the network's T-API interface.

### Test Configuration
A specific setup of network equipment and services in a lab environment for testing purposes.

### User Story
In agile development, a description of a feature or functionality from an end-user perspective, typically stored in project management tools like Jira.

## Security & Compliance Terms

### Air-Gapped
A security measure where a network or system is physically isolated from external networks, including the internet.

### Audit Trail
A chronological record of system activities, providing documentation of who did what and when.

### Data Sovereignty
The concept that data is subject to the laws and regulations of the country where it is physically located.

### On-Premises
Infrastructure and software deployed within an organization's own facilities rather than in the cloud.

### Role-Based Access Control (RBAC)
A security model where user permissions are assigned based on their role within the organization.

### Single Sign-On (SSO)
An authentication method that allows users to access multiple applications with a single set of credentials.

## Common Acronyms

| Acronym | Full Term | Description |
|---------|-----------|-------------|
| AI | Artificial Intelligence | Machine intelligence that simulates human cognitive functions |
| API | Application Programming Interface | A set of protocols for building and integrating application software |
| BER | Bit Error Rate | Measure of transmission quality |
| CLI | Command Line Interface | Text-based interface for entering commands |
| DWDM | Dense Wavelength Division Multiplexing | Technology for transmitting multiple signals on different wavelengths |
| FEC | Forward Error Correction | Error correction technique |
| HITL | Human-in-the-Loop | Safety pattern requiring human approval |
| JSON | JavaScript Object Notation | Lightweight data interchange format |
| LLM | Large Language Model | AI model for natural language processing |
| MCP | Model Context Protocol | Protocol for AI assistant integration |
| NMS | Network Management System | Network monitoring and configuration platform |
| OSNR | Optical Signal-to-Noise Ratio | Measure of optical signal quality |
| POP | Point of Presence | Network access location |
| QAM | Quadrature Amplitude Modulation | Digital modulation technique |
| RBAC | Role-Based Access Control | Security access control method |
| REST | Representational State Transfer | Web API architectural style |
| ROADM | Reconfigurable Optical Add-Drop Multiplexer | Dynamic wavelength routing device |
| SSO | Single Sign-On | Unified authentication system |
| T-API | Transport API | Standardized transport network API |
| UI | User Interface | Visual interface for user interaction |
| UX | User Experience | Overall experience of using a system |
| VPN | Virtual Private Network | Secure network connection |
| ZR | Zero-dispersion | Optical transmission standard |

---

:::tip Need More Information?
If you can't find a term you're looking for, check the specific documentation sections or ask the AI Copilot directly for explanations.
:::
