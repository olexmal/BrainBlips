# Lab Manager MCP Server

This MCP server manages the development and test lab environment for software development and testing teams.

## Purpose

The Lab Manager serves as the "Lab Doer" server, providing tools for managing emulated network environments and facilitating development workflows.

## Key Functions

### Emulator Inventory Management
- `get_available_emulators()`
- `get_emulator_details(emulator_id)`
- `reserve_emulator(emulator_id, duration)`
- `release_emulator(emulator_id)`

### Hardware Knowledge Base
- `what_cards_support_standard("800ZR")`
- `get_card_compatibility(chassis_type)`
- `get_available_hardware(lab_pod)`
- `check_firmware_requirements(card_type)`

### Service Configuration Builder
- `generate_test_service_config(bandwidth, modulation, protection)`
- `create_protected_service_config(endpoints, bandwidth)`
- `generate_cli_commands(service_config)`
- `validate_configuration(config_json)`

### Issue Reproduction Helper
- `replicate_client_issue(service_config_from_client)`
- `suggest_lab_setup(issue_description)`
- `generate_test_scenarios(use_case)`
- `create_minimal_reproduction(complex_config)`

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

## Related Files
- [04 - Development Copilot](../../04%20-%20Development%20Copilot.md)
- [02 - Core Architecture](../../02%20-%20Core%20Architecture.md)
