---
title: AI Skills System
sidebar_position: 5
---

# AI Skills System: Cross-Tool Markdown Skills for AI Assistants

## 📖 Overview

A system for creating reusable AI skills as markdown files that work across different AI coding assistants (GitHub Copilot, Cursor, Claude, etc.). This enables consistent coding patterns and best practices across your entire development workflow.

## 🎯 Core Concept

**AI Skills** are markdown files containing specialized instructions, patterns, and templates that AI assistants can reference to generate code following your specific standards and best practices.

## 📁 Directory Structure

```
ai-skills/
├── testing/
│   ├── junit-5-and-mockito-specialist.md
│   ├── spring-testing-expert.md
│   └── integration-testing-patterns.md
├── backend/
│   ├── spring-boot-rest-specialist.md
│   ├── database-migration-expert.md
│   └── security-jwt-specialist.md
├── frontend/
│   ├── react-hooks-specialist.md
│   ├── vue-3-composition-expert.md
│   └── typescript-best-practices.md
└── devops/
    ├── docker-optimization-specialist.md
    ├── k8s-deployment-expert.md
    └── ci-cd-pipelines.md
```

## 🚀 Usage Patterns

### Simple Chat Commands

**No code pasting needed** - AI tools can read your current file and apply skills directly:

```
"Use skills/testing/junit-5-and-mockito-specialist.md to create unit tests for this class"
```

```
"Apply skills/backend/spring-boot-rest-specialist.md to refactor this controller"
```

```
"Follow skills/backend/database-migration-expert.md to optimize this SQL migration"
```

```
"Use skills/frontend/react-hooks-specialist.md to convert this to custom hooks"
```

### Advanced Usage

**Skill Chaining:**
```
"First use skills/backend/spring-boot-rest-specialist.md for API structure, then skills/testing/junit-5-and-mockito-specialist.md for tests"
```

**Multi-Skill Application:**
```
"Use skills/backend/spring-security-specialist.md for security config and skills/testing/junit-5-and-mockito-specialist.md for tests"
```

## 💡 Example Skill Template

### `skills/testing/junit-5-and-mockito-specialist.md`

```markdown
# JUnit 5 & Mockito Testing Specialist

## Purpose
Expert in writing comprehensive, maintainable unit tests using JUnit 5 and Mockito following best practices.

## Core Principles
- Use @DisplayName for descriptive test names
- Employ @Nested for test organization  
- Leverage parameterized tests for multiple scenarios
- Follow BDD style with given/when/then
- Use assertAll for grouped assertions
- Implement proper mock verification

## Test Structure
```java
@DisplayName("ClassName Unit Tests")
@ExtendWith(MockitoExtension.class)
class ClassNameTest {
    
    @Mock
    private Dependency dependency;
    
    @InjectMocks
    private ClassUnderTest classUnderTest;
    
    @Nested
    @DisplayName("When scenario")
    class WhenScenario {
        
        @Test
        @DisplayName("Should expected behavior when condition")
        void shouldExpectedBehavior_WhenCondition() {
            // Given
            setupMocks();
            
            // When
            Result result = classUnderTest.method();
            
            // Then
            assertAll(
                () -> assertEquals(expected, result),
                () -> verify(dependency).method()
            );
        }
    }
}
```

## Common Patterns
- Exception testing: assertThrows
- Parameterized tests: @ValueSource, @CsvSource
- Mock verification: verify with argument captors
```

## 🛠️ Tool-Specific Implementation

### GitHub Copilot
- Use chat: "Reference skills/path/to/skill.md for this task"
- Works with both chat and inline suggestions

### Cursor
- Natural chat integration: "Use skills/testing/x.md for this class"
- Can reference multiple files with @ syntax

### Claude Desktop
- Direct file reference in chat
- Can process multiple skills in one request

## ✅ Benefits

1. **Consistency** - Uniform coding standards across team
2. **Knowledge Sharing** - Onboard new developers quickly  
3. **Quality** - Enforce best practices automatically
4. **Tool Agnostic** - Works with any AI coding assistant
5. **Version Controlled** - Skills evolve with your codebase
6. **Clean Code** - No skill references polluting actual code files

## 🎯 Workflow

1. **Create skill files** for your common patterns
2. **Reference in chat** when working with AI assistants
3. **AI applies patterns** to generate appropriate code
4. **Iterate and improve** skills based on results

## 🔄 Maintenance

- Regularly update skills as standards evolve
- Add new skills for emerging patterns
- Remove outdated approaches
- Share skills across team members

---

*This system turns your skills directory into living documentation that actively generates code according to your team's standards.*

