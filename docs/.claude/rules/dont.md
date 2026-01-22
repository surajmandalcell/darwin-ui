# Things to Avoid

## Icons

- **Never use the `Sparkles` icon from `lucide-react`** - Use alternative icons like `Zap`, `Star`, `Wand2`, or `Lightbulb` instead.

## Dev Server

- **Always kill existing dev server instances before starting a new one** - Run `lsof -ti:4200 | xargs kill -9 2>/dev/null` before `npm run dev`. Never let Vite find new ports (4201, 4202, etc.) leaving orphaned processes.

## UI Verification

- **Verify actual content renders, not just page loads** - When testing pages with Playwright, check that meaningful content is present (text, buttons, data) not just that the page URL loaded. Use `browser_snapshot` and verify key elements exist.
