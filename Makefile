# Darwin UI - Makefile
# Usage: make <target>

.PHONY: dev build preview lint test clean docs help

# Start docs dev server (kills existing first)
dev:
	@lsof -ti :4200 | xargs -r kill -9 2>/dev/null || true
	cd docs && npm run dev

# Build component library
build:
	npm run build

# Build docs for production
docs:
	cd docs && npm run build

# Preview docs production build (kills existing first)
preview:
	@lsof -ti :4201 | xargs -r kill -9 2>/dev/null || true
	cd docs && npm run preview

# Lint codebase
lint:
	npm run lint
	cd docs && npm run lint

# Run tests
test:
	cd docs && npm run test

# Generate llms.txt for AI scrapers
llms:
	cd docs && npm run llms

# Clean build artifacts
clean:
	rm -rf dist
	rm -rf docs/dist
	rm -rf node_modules/.vite
	rm -rf docs/node_modules/.vite

# Build registry for shadcn CLI
registry:
	npm run build:registry

# Install all dependencies
install:
	npm install
	cd docs && npm install

# Display help
help:
	@echo "Darwin UI - Available targets:"
	@echo ""
	@echo "  dev       - Start docs development server"
	@echo "  build     - Build component library"
	@echo "  docs      - Build docs for production"
	@echo "  preview   - Preview docs production build"
	@echo "  lint      - Run ESLint on library and docs"
	@echo "  test      - Run tests"
	@echo "  llms      - Generate llms.txt for AI scrapers"
	@echo "  registry  - Build shadcn registry"
	@echo "  clean     - Remove build artifacts"
	@echo "  install   - Install all dependencies"
	@echo "  help      - Show this help message"
