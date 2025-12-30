# Contributing to Darwin UI

Thank you for your interest in contributing to Darwin UI! This document provides guidelines and information for contributors.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/darwin-ui.git`
3. Install dependencies: `npm install`
4. Start development: `npm run dev`

## Development Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev

# Build the registry (for shadcn compatibility)
npm run build:registry
```

## Project Structure

```
darwin-ui/
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities (cn, etc.)
│   ├── contexts/       # React contexts
│   └── styles/         # CSS files
├── docs/               # Documentation site (Astro Starlight)
├── scripts/            # Build scripts
└── registry/           # shadcn registry source
```

## Component Guidelines

### Styling
- Use Tailwind CSS utilities
- Follow the glass-morphism aesthetic with `backdrop-blur`, `bg-white/10` patterns
- Use CSS variables for theming (defined in `darwin-ui.css`)
- Use `cn()` utility for conditional class merging

### TypeScript
- All components must be written in TypeScript
- Export types for component props
- Use `React.forwardRef` for components that need ref forwarding

### Accessibility
- Include proper ARIA attributes
- Support keyboard navigation
- Use semantic HTML elements
- Test with screen readers when possible

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Ensure the build passes: `npm run build`
4. Update documentation if needed
5. Submit a pull request with a clear description

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Adding New Components

1. Create the component in `src/components/`
2. Export it from `src/components/index.ts`
3. Add documentation in `docs/src/content/docs/components/`
4. Add to the registry in `scripts/build-registry.ts`

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something great together.

## Questions?

Open an issue or reach out to the maintainers.

---

Thank you for contributing!
