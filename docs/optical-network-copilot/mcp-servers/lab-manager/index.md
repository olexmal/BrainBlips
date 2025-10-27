---
title: Lab Manager MCP Server
sidebar_position: 1
sidebar_label: Lab Manager
description: MCP server for managing development and test lab environments with emulator inventory, hardware knowledge, and service configuration tools
tags: [mcp-server, lab-manager, development, testing]
keywords: [lab manager, mcp server, emulator, testing environment, development tools]
---

# Lab Manager MCP Server

This MCP server manages the development and test lab environment for software development and testing teams.

## Purpose

The Lab Manager serves as the "Lab Doer" server, providing tools for managing emulated network environments and facilitating development workflows.

## Key Functions

:::tip Quick Start
The Lab Manager MCP provides tools for emulator management, hardware discovery, configuration generation, and issue reproduction.
:::

### Emulator Inventory Management

| Function | Description |
|----------|-------------|
| `get_available_emulators()` | List all available lab emulators |
| `get_emulator_details(emulator_id)` | Get detailed specs for specific emulator |
| `reserve_emulator(emulator_id, duration)` | Reserve an emulator for testing |
| `release_emulator(emulator_id)` | Release a reserved emulator |

### Hardware Knowledge Base

| Function | Description |
|----------|-------------|
| `what_cards_support_standard("800ZR")` | Find cards supporting specific standards |
| `get_card_compatibility(chassis_type)` | Check card compatibility for chassis |
| `get_available_hardware(lab_pod)` | List hardware in specific lab pod |
| `check_firmware_requirements(card_type)` | Get firmware requirements for card |

### Service Configuration Builder

| Function | Description |
|----------|-------------|
| `generate_test_service_config(bandwidth, modulation, protection)` | Generate test service configuration |
| `create_protected_service_config(endpoints, bandwidth)` | Create protected service config |
| `generate_cli_commands(service_config)` | Convert config to CLI commands |
| `validate_configuration(config_json)` | Validate configuration syntax |

### Issue Reproduction Helper

| Function | Description |
|----------|-------------|
| `replicate_client_issue(service_config_from_client)` | Replicate customer issues in lab |
| `suggest_lab_setup(issue_description)` | Suggest lab setup for testing |
| `generate_test_scenarios(use_case)` | Generate test scenarios |
| `create_minimal_reproduction(complex_config)` | Create minimal repro config |

## Lab Environment Features

### Pod Management
- **Lab Pod 1**: Development environment
- **Lab Pod 2**: Testing environment  
- **Lab Pod 3**: Integration testing
- **Lab Pod 4**: Performance testing

### Hardware Inventory
- **Chassis Types**: GX-7-CM, GX-6-CM, etc.
- **Line Cards**: GX-7-800ZR, GX-7-200G, etc.
- **Firmware Versions**: v8.2.1, v8.3.0, etc.

### Automation Capabilities
- **Environment Setup**: Automated lab configuration
- **Test Execution**: Automated test scenario running
- **Cleanup**: Automatic resource cleanup
- **Reporting**: Test results and environment status
