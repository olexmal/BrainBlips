---
title: T-API Gateway MCP Server
sidebar_position: 3
sidebar_label: T-API Gateway
description: Controlled interface MCP server for network operations providing safe T-API access with validation, auditing, and rollback capabilities
tags: [mcp-server, t-api, network-operations, provisioning]
keywords: [t-api gateway, mcp server, network operations, provisioning, telemetry, topology]
---

# T-API Gateway MCP Server

This MCP server provides a safe, controlled interface to the network's northbound T-API.

## Purpose

The T-API Gateway serves as the "Doer" server, handling all network operations and provisioning tasks through the T-API interface.

## Key Functions

:::tip Quick Start
The T-API Gateway provides controlled network access with safety features, validation, and comprehensive logging.
:::

### Service Provisioning

| Function | Description |
|----------|-------------|
| `create_eline_service(location_a, location_z, bandwidth, service_class)` | Create new E-Line service |
| `modify_service(service_id, new_parameters)` | Modify existing service parameters |
| `delete_service(service_id)` | Remove service from network |

:::warning Confirmation Required
All service provisioning operations require explicit human approval before execution.
:::

### Network Status & Telemetry

| Function | Description |
|----------|-------------|
| `get_network_health()` | Overall network health status |
| `get_optical_power(span_id)` | Optical power readings for span |
| `get_service_status(service_id)` | Service operational status |
| `get_alarm_status()` | Active network alarms |

### Topology Discovery

| Function | Description |
|----------|-------------|
| `get_network_topology()` | Complete network topology map |
| `find_path(location_a, location_z)` | Find route between locations |
| `get_equipment_details(equipment_id)` | Equipment specifications |

## Safety Features

:::note Security Architecture
Multiple layers of protection ensure safe network operations.
:::

| Feature | Implementation |
|---------|---------------|
| **Read-First Approach** | All provisioning tools require human confirmation |
| **Validation** | Commands validated against business rules |
| **Audit Logging** | All operations logged for compliance |
| **Rollback Capability** | Changes can be reverted if needed |

