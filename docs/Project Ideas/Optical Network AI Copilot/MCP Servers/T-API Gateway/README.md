# T-API Gateway MCP Server

This MCP server provides a safe, controlled interface to the network's northbound T-API.

## Purpose

The T-API Gateway serves as the "Doer" server, handling all network operations and provisioning tasks through the T-API interface.

## Key Functions

### Service Provisioning
- `create_eline_service(location_a, location_z, bandwidth, service_class)`
- `modify_service(service_id, new_parameters)`
- `delete_service(service_id)`

### Network Status & Telemetry
- `get_network_health()`
- `get_optical_power(span_id)`
- `get_service_status(service_id)`
- `get_alarm_status()`

### Topology Discovery
- `get_network_topology()`
- `find_path(location_a, location_z)`
- `get_equipment_details(equipment_id)`

## Safety Features

- **Read-First Approach**: All provisioning tools require human confirmation
- **Validation**: All commands are validated against business rules
- **Audit Logging**: All operations are logged for compliance
- **Rollback Capability**: Changes can be reverted if needed

## Related Files
- [03 - Network Operations Copilot](../../03%20-%20Network%20Operations%20Copilot)
- [02 - Core Architecture](../../02%20-%20Core%20Architecture)
