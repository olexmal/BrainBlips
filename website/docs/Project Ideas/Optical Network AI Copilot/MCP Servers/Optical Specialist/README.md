# Optical Specialist MCP Server

This MCP server provides Claude with deep, contextual knowledge of optical networking.

## Purpose

The Optical Specialist serves as the "Teacher" server, providing expert knowledge and diagnostic capabilities for optical network troubleshooting and understanding.

## Key Functions

### Knowledge Base Retrieval
- **Equipment Manuals**: Access to vendor documentation and specifications
- **Engineering Guidelines**: Best practices and operational procedures
- **Trouble Ticket History**: Past incidents and their resolutions
- **API Specifications**: Technical documentation for network interfaces

### Diagnostic Logic
- `diagnose_q_factor_degradation(cause_indicators)`
- `analyze_optical_power_levels(power_readings)`
- `identify_fiber_issues(symptoms)`
- `suggest_power_correction(current_power, target_power)`

### Troubleshooting Wizards
- **Expert Heuristics**: Embeds senior specialists' knowledge
- **Decision Trees**: Step-by-step troubleshooting guides
- **Pattern Recognition**: Identifies common issues and solutions

### Glossary and Concepts
- **Technical Terms**: OSNR, Chromatic Dispersion, FEC, etc.
- **Equipment Types**: ROADMs, amplifiers, transponders
- **Standards**: ITU-T, IEEE, and vendor-specific protocols

## Data Sources

- Vector database of equipment manuals
- Engineering guidelines repository
- Historical trouble tickets
- Network topology information
- Performance metrics and thresholds

## Related Files
- [03 - Network Operations Copilot](../../03%20-%20Network%20Operations%20Copilot.md)
- [04 - Development Copilot](../../04%20-%20Development%20Copilot.md)
- [02 - Core Architecture](../../02%20-%20Core%20Architecture.md)
