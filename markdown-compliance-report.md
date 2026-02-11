# Markdown Rule Compliance Report

Verification of `docs/**/*.md` against [.cursor/rules/markdown-docs.mdc](.cursor/rules/markdown-docs.mdc).

## Rule Summary

| Rule | Requirement |
|------|-------------|
| **Headings** | `#` page title, `##` main sections, `###` subsections |
| **Links** | Internal: `[text](path)` with relative paths; External: full URL |
| **Code** | Fenced blocks with language tag; Inline with backticks |
| **Other** | Lists, tables, emphasis consistent; Short paragraphs; Bullet points |

---

## Non-Compliant Issues

### 1. Obsidian Wiki-Links (Links Rule)

**Rule**: Internal links must use `[text](path)` format.

**Violation**: Obsidian syntax `[[path]]` is used; Docsify does not render these.

| File | Lines |
|------|-------|
| `Project Ideas/.../01 - Project Overview.md` | 4-8 |
| `Project Ideas/.../02 - Core Architecture.md` | 4-8 |
| `Project Ideas/.../03 - Network Operations Copilot.md` | 4-8 |
| `Project Ideas/.../04 - Development Copilot.md` | 4-8 |
| `Project Ideas/.../05 - Implementation Roadmap.md` | 4-8 |
| `Project Ideas/.../06 - Success Factors & Conclusion.md` | 4-6 |
| `AI/LM Studio/Enhancing DeepSeek R1 Distill Qwen 7B with MCP.md` | 197 (example in note) |

**Fix**: Convert `[[02 - Core Architecture]]` → `[02 - Core Architecture](02%20-%20Core%20Architecture)` (adjust path for each file's location).

### 2. Code Blocks Without Language Tag (Code Rule)

**Rule**: Fenced blocks must have a language tag.

**Violation**: Plain ``` blocks with no language specified.

| File | Content |
|------|---------|
| `docs/project-structure.md` | Directory tree (lines 11-33) |
| `docs/cursor-setup.md` | Include/exclude patterns (37-47, 52-60), directory structure (65-87) |
| `AI/LM Studio/Enhancing DeepSeek R1 Distill Qwen 7B with MCP.md` | Prompt example (101-103) |

**Fix**: Add `text` or `plaintext` to generic blocks, e.g. ` ```text`.

### 3. Minor: Bare URL (Links Rule)

**File**: `guide/getting-started.md` line 24  
**Issue**: `http://localhost:3000` is plain text, not a Markdown link.  
**Fix**: Use `[http://localhost:3000](http://localhost:3000)` for consistency.

### 4. Minor: Missing Page Title (Headings Rule)

**File**: `Docker/Introduction.md`  
**Issue**: No `#` page title; content starts with paragraphs, then `# Docker compose` as a section.  
**Fix**: Add `# Docker` or `# Docker Introduction` at the top.

---

## Compliant Files

- `docs/README.md` - Headings, links, code (`bash`, `mermaid`), structure
- `docs/guide/getting-started.md` - Aside from bare URL, otherwise compliant
- `docs/_sidebar.md` - Uses `[text](path)`; Docsify-specific format
- `docs/docs/README.md` - Compliant
- `docs/docs/mcp-servers.md` - All blocks use `json`, compliant
- `docs/Docker/Install Docker in Ubuntu 24.04.md` - Uses `bash`, compliant
- `docs/Docker/Install Docker Compose in Ubuntu 24.04.md` - Uses `bash`, compliant
- MCP Server READMEs (Lab Manager, Optical Specialist, T-API Gateway) - Links converted, compliant
- Claude/Claude Client.md, LLM Server Requirements.md - Links converted, compliant

---

## Summary

| Category | Count |
|----------|-------|
| Files with Obsidian links | 7 |
| Files with untagged code blocks | 3 |
| Minor issues | 2 |
| Fully compliant | 15+ |

**Recommendation**: Fix Obsidian links first (user-facing). Then add language tags to plain code blocks, and optionally fix the minor issues.
