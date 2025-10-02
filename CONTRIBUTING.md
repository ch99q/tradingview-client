# Contributing to TradingView WebSocket Client

Thank you for your interest in contributing to the TradingView WebSocket Client! We welcome contributions from the community and are pleased to have you join us.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- Bun (recommended) or npm/yarn/pnpm
- Git
- TypeScript knowledge
- Basic understanding of WebSockets and financial data

### Development Setup

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/your-username/tradingview-client.git
   cd tradingview-client
   ```

2. **Install Dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Install Additional Dependencies for Node.js**
   ```bash
   bun add -d ws @types/ws
   ```

4. **Build the Project**
   ```bash
   bun run build
   ```

5. **Run Tests**
   ```bash
   bun test
   ```

6. **Type Check**
   ```bash
   bun run typecheck
   ```

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **Bug fixes** - Help us fix issues in the codebase
- **Features** - Add new functionality or improve existing features
- **Documentation** - Improve or add to our documentation
- **Tests** - Add test coverage or improve existing tests
- **Examples** - Create examples showing how to use the library
- **Performance** - Optimize existing code for better performance

### Before You Start

1. **Check existing issues** - Look through existing issues and pull requests to avoid duplicating work
2. **Create an issue** - For significant changes, create an issue first to discuss the approach
3. **Small changes** - For small bug fixes or improvements, you can directly create a pull request

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Write clean, readable code following our coding guidelines
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add support for custom timeframes in screener

- Add timeframe parameter to ScreenerQuery
- Update type definitions
- Add tests for timeframe functionality
- Update documentation with examples"
```

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (whitespace, formatting)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request through GitHub with:

- Clear title describing the change
- Detailed description of what was changed and why
- Reference any related issues
- Screenshots or examples if applicable

### 5. Code Review Process

- Maintainers will review your pull request
- Address any feedback or requested changes
- Once approved, your PR will be merged

## Coding Guidelines

### TypeScript Standards

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Code Style

We use automated formatting, but here are the general principles:

- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Use trailing commas where applicable
- Maximum line length of 100 characters

### File Organization

```
src/
├── client.ts          # Main WebSocket client
├── screener.ts        # Screener functionality
├── index.ts           # Public exports
├── studies/           # Technical indicators
│   ├── basic.ts       # Basic indicators (SMA, EMA, etc.)
│   └── std.ts         # Standard indicators (RSI, MACD, etc.)
└── types/             # Additional type definitions
```

### API Design Principles

- **Consistency** - Similar functions should have similar signatures
- **Type Safety** - Leverage TypeScript's type system
- **Chainable APIs** - Use method chaining where appropriate
- **Error Handling** - Provide clear error messages and types
- **Documentation** - All public APIs should be well documented

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run specific test file
bun test client.test.ts
```

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies appropriately

Example test structure:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createSession, createChart } from '../src/index.js';

describe('Chart Operations', () => {
  let session: any;

  beforeEach(async () => {
    session = await createSession();
  });

  afterEach(async () => {
    await session?.close();
  });

  it('should create a chart successfully', async () => {
    const chart = await createChart(session);
    expect(chart).toBeDefined();
    expect(chart.id).toMatch(/^chart_/);
  });

  it('should resolve symbols correctly', async () => {
    const chart = await createChart(session);
    const symbol = await chart.resolve('AAPL', 'NASDAQ');
    
    expect(symbol.full_name).toContain('AAPL');
    expect(symbol.exchange).toBe('NASDAQ');
  });
});
```

### Test Categories

- **Unit Tests** - Test individual functions and classes
- **Integration Tests** - Test interactions between components
- **End-to-End Tests** - Test complete workflows
- **Performance Tests** - Test performance characteristics

## Documentation

### Code Documentation

- Use JSDoc comments for all public APIs
- Include examples in documentation
- Document parameters and return values
- Explain complex algorithms or business logic

Example:

```typescript
/**
 * Creates a new series for historical and real-time market data
 * 
 * @param session - Active WebSocket session
 * @param chart - Chart instance
 * @param symbol - Resolved symbol information
 * @param timeframe - Chart timeframe (e.g., "1D", "1H", "5")
 * @param count - Number of historical bars to fetch
 * @param range - Optional time range or predefined range
 * @returns Promise resolving to Series instance
 * 
 * @example
 * ```typescript
 * const series = await createSeries(session, chart, symbol, "1D", 100);
 * console.log("Latest price:", series.history[series.history.length - 1]);
 * ```
 */
export function createSeries(/* ... */): Promise<Series> {
  // Implementation
}
```

### README Updates

When adding new features:

1. Update the feature list
2. Add examples to the Quick Start section
3. Update the API Reference
4. Add any new dependencies or requirements

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Clear description** - What happened vs. what you expected
2. **Reproduction steps** - Minimal code to reproduce the issue
3. **Environment details** - OS, Node.js version, package version
4. **Error messages** - Full error stack traces
5. **Additional context** - Screenshots, logs, etc.

Use this template:

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Create session with '...'
2. Call method '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Code Sample**
```typescript
// Minimal code sample that reproduces the issue
```

**Environment**
- OS: [e.g. macOS 12.0]
- Node.js: [e.g. 18.17.0]
- Package version: [e.g. 1.0.0]
- Browser (if applicable): [e.g. Chrome 119]

**Additional Context**
Any other context about the problem.
```

### Security Issues

For security vulnerabilities, please **DO NOT** open a public issue. Instead:

1. Email the maintainers directly
2. Provide a clear description of the vulnerability
3. Include steps to reproduce if applicable
4. Allow time for the issue to be addressed before public disclosure

## Feature Requests

We welcome feature requests! Please:

1. **Check existing requests** - Avoid duplicating existing requests
2. **Provide clear use case** - Explain why the feature would be valuable
3. **Consider implementation** - Think about how it might work
4. **Be patient** - Features take time to design and implement

Use this template:

```markdown
**Feature Description**
A clear description of what you want to happen.

**Use Case**
Describe the problem this feature would solve and who would benefit.

**Proposed Solution**
Describe how you envision this feature working.

**Alternative Solutions**
Any alternative approaches you've considered.

**Additional Context**
Any other context, mockups, or examples.
```

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/improvements

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. Publish to npm
5. Create GitHub release

## Getting Help

If you need help with contributing:

- Check existing documentation and issues
- Ask questions in GitHub Discussions
- Reach out to maintainers
- Join our community channels

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to make this library better for everyone! 🚀