# Pillar 2: AI Copilot for Development & Testing ("Dev Copilot")

## Navigation
- [01 - Project Overview](Project%20Ideas/Optical%20Network%20AI%20Copilot/01%20-%20Project%20Overview)
- [02 - Core Architecture](Project%20Ideas/Optical%20Network%20AI%20Copilot/02%20-%20Core%20Architecture)
- [03 - Network Operations Copilot](Project%20Ideas/Optical%20Network%20AI%20Copilot/03%20-%20Network%20Operations%20Copilot)
- [05 - Implementation Roadmap](Project%20Ideas/Optical%20Network%20AI%20Copilot/05%20-%20Implementation%20Roadmap)
- [06 - Success Factors & Conclusion](Project%20Ideas/Optical%20Network%20AI%20Copilot/06%20-%20Success%20Factors%20%26%20Conclusion)

---

This pillar assists software developers and testers in building and validating features against emulated networks, drastically reducing their learning curve.

## The Two MCP Servers for Development

### **1. Emulator & Lab Manager MCP Server (The "Lab Doer")**
This server manages the development and test lab environment.

*   **Key Functions:**
    *   **Emulator Inventory:** `get_available_emulators()`, `get_emulator_details(emulator_id)`.
    *   **Hardware Knowledge Base:** `what_cards_support_standard("800ZR")`, `get_card_compatibility(chassis_type)`.
    *   **Service Configuration Builder:** `generate_test_service_config(bandwidth, modulation)` -> returns exact CLI/API commands.
    *   **Issue Reproduction Helper:** `replicate_client_issue(service_config_from_client)` -> suggests a minimal lab setup to mimic a client issue.

### **2. Optical Specialist & Docs MCP Server (The "Dev Teacher")**
This server provides knowledge tailored for a developer audience.

*   **Key Functions:**
    *   **Feature Specification Retrieval:** `get_user_story_details(story_id)` fetches acceptance criteria from Jira/Aha!/wikis.
    *   **API & Manual Integration:** `get_api_docs_for_endpoint(api_endpoint)`, `get_manual_for_card(card_type)`.
    *   **Best Practices for Development:** Coding guidelines, examples of good T-API implementations.

## Development Use Case: Kickstarting a New Feature

**Scenario:** A junior developer is tasked with implementing support for a new 800G-ZR service.

**Developer's conversation with Claude:**

1.  **Developer:** "I'm working on user story `PROJ-123` to add support for 800G-ZR services. What hardware do I need in my emulators to develop this?"
    *   *Claude uses the Optical Specialist MCP to call `get_user_story_details("PROJ-123")`.*
    *   *Claude uses the Lab Manager MCP to call `what_cards_support_standard("800G-ZR")`.*
    *   **Claude:** "For PROJ-123, you'll need a line card that supports 800G-ZR, like the `GX-7-800ZR` card, in a compatible chassis like the GX-7-CM. You have two of these chassis free in Lab Pod 3."

2.  **Developer:** "Great. Now, generate the configuration for a protected 800G service between two of these cards."
    *   *Claude uses the Lab Manager MCP to run `generate_test_service_config(800, "ZR", "1+1")`.*
    *   **Claude:** "Here is the T-API payload and the CLI commands for the `GX-7-800ZR` cards to create a protected service. I've included the mandatory `protection` object as per the API specs."

## Testing Use Case: Reproducing a Client Issue

**Tester:** "Client `Acme Corp` has reported a fault on their 200G service. Here is their config JSON. How can I reproduce this in the lab?"

*   *Claude uses the Lab Manager MCP to run `replicate_client_issue(pasted_json)`.*
*   **Claude:** "To replicate this, you need two `GX-7-200G` cards in slots 2 and 5 of your emulator, running firmware `v8.2.1`. Your Lab Pod 2 has the required equipment. Should I generate the scripts to build this environment?"
