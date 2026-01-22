# Darwin UI Docs - Makefile
# Usage: make <target>

.PHONY: dev build preview lint llms clean help

# Development server
dev:
	npm run dev

# Production build
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Lint codebase
lint:
	npm run lint

# Generate llms.txt for AI scrapers
llms:
	npm run llms

# Clean build artifacts
clean:
	rm -rf dist
	rm -rf node_modules/.vite

# Display help
help:
	@echo "Darwin UI Docs - Available targets:"
	@echo ""
	@echo "  dev      - Start development server"
	@echo "  build    - Build for production"
	@echo "  preview  - Preview production build"
	@echo "  lint     - Run ESLint"
	@echo "  llms     - Generate llms.txt for AI scrapers"
	@echo "  clean    - Remove build artifacts"
	@echo "  help     - Show this help message"
