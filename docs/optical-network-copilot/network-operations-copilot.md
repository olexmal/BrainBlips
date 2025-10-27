---
title: Network Operations Copilot
sidebar_position: 3
description: AI Copilot solution for network operators featuring T-API Gateway and Optical Specialist MCP servers for intelligent network management
tags: [network-operations, t-api, troubleshooting]
keywords: [network operations, t-api gateway, optical specialist, network management, troubleshooting, provisioning]
---

# Pillar 1: AI Copilot for Network Operations ("Network Copilot")

This pillar is designed to assist network operators, especially new hires, in managing the live network.

## The Two MCP Servers for Operations

### **1. T-API Gateway MCP Server (The "Doer")**

:::tip Server Role: Network Operations Executor
This server provides a safe, controlled interface to the network's northbound T-API.
:::

**Key Functions:**

- **Service Provisioning:** Tools like `create_eline_service(location_a, location_z, bandwidth, service_class)`
- **Network Status & Telemetry:** `get_network_health()`, `get_optical_power(span_id)`, `get_service_status(service_id)`
- **Topology Discovery:** `get_network_topology()`, `find_path(location_a, location_z)`

:::warning Safety First
All provisioning or modification tools require human confirmation before execution.
:::

### **2. Optical Specialist MCP Server (The "Teacher")**

:::tip Server Role: Knowledge Provider
This server provides Claude with deep, contextual knowledge of optical networking.
:::

**Key Functions:**

- **Knowledge Base Retrieval:** Connected to a vector database of equipment manuals, engineering guidelines, and past trouble tickets
- **Diagnostic Logic:** Tools like `diagnose_q_factor_degradation(cause_indicators)`
- **Troubleshooting Wizards:** Embeds experts' heuristic knowledge
- **Glossary and Concepts:** Defines terms like `OSNR`, `Chromatic Dispersion`, `FEC`

## Operational Use Case: Troubleshooting for a New Operator

:::note Real-World Troubleshooting Scenario
This example demonstrates how a new network operator can leverage the AI Copilot to diagnose and resolve customer issues efficiently.
:::

**Scenario:** A new operator receives a ticket: "Customer at POP A reports slow connectivity to Data Center Z."

**Operator's conversation with Claude (via local client):**

1.  **Operator:** "Hey Claude, can you check the status of the customer service for `Customer_ABC` between POP A and DC Z?"
    *   *Claude uses the T-API MCP to call `find_service("Customer_ABC")` and `get_service_status(service_123)`.*
    *   **Claude:** "I found service `service_123`. Its status is 'Active', but I'm seeing a high Bit Error Rate (BER) warning on the intermediate link between ROADM-7 and ROADM-8."

2.  **Operator:** "What does a high BER mean and what usually causes it on this type of link?"
    *   *Claude uses the Optical Specialist MCP to retrieve knowledge base entries on "BER".*
    *   **Claude:** "A high BER means many errors are occurring in the data transmission. Common causes for this on your `Infinera ICE-6` platform could be: 1) Low optical signal power, 2) High optical noise (low OSNR), 3) Fiber issues like a dirty connector."

3.  **Operator:** "Okay, show me the optical power levels for the receivers on ROADM-7 and ROADM-8 for that service."
    *   *Claude uses the T-API MCP to call `get_optical_power(span_7-8)`.*
    *   **Claude:** "The received power at ROADM-8 is -28 dBm. According to the engineering guidelines, the optimal range is between -22 and -26 dBm. This suggests the signal is too weak."

4.  **Operator:** "What's the best way to fix this?"
    *   *Claude uses the Optical Specialist MCP tool `suggest_power_correction(-28, -24)`.*
    *   **Claude:** "I recommend increasing the output power of the amplifier at ROADM-7 by 2 dB. Would you like me to prepare the command for you?"

5.  **Operator:** "Yes, please execute that change."
    *   The operator reviews the command and confirms.
    *   *Claude instructs the T-API MCP to run the `adjust_amplifier_power(amp_ROADM7, +2dB)` command.*
