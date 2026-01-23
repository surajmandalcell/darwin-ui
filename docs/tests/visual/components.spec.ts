import { test, expect, type Page, type TestInfo } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// All component pages from the docs navigation
const COMPONENTS = [
	"accordion",
	"avatar",
	"badge",
	"button",
	"card",
	"charts",
	"checkbox",
	"close-button",
	"contact-form",
	"context-menu",
	"date-select",
	"dialog",
	"dropdown-menu",
	"image",
	"input",
	"md-editor",
	"modal",
	"multi-select",
	"popover",
	"progress",
	"reveal",
	"search-input",
	"select",
	"sidebar",
	"skeleton",
	"slider",
	"switch",
	"table",
	"tabs",
	"textarea",
	"tooltip",
	"upload",
	"window",
];

// Theme setup helper
async function setTheme(page: Page, theme: "light" | "dark") {
	await page.evaluate((t) => {
		localStorage.setItem("darwin-ui-theme", t);
		document.documentElement.setAttribute("data-theme", t);
		// Also set the class for Tailwind dark mode
		if (t === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, theme);
	// Wait for theme transition
	await page.waitForTimeout(200);
}

// Get the current test's theme from project name
function getThemeFromProject(testInfo: TestInfo): "light" | "dark" {
	return testInfo.project.name.includes("light") ? "light" : "dark";
}

test.describe("Component Visual Regression", () => {
	for (const component of COMPONENTS) {
		test.describe(component, () => {
			test.beforeEach(async ({ page }, testInfo) => {
				const theme = getThemeFromProject(testInfo);
				await page.goto(`/docs/components/${component}`);
				await setTheme(page, theme);
				await page.waitForLoadState("networkidle");
				// Give extra time for animations to settle
				await page.waitForTimeout(500);
			});

			// 1. AUTOMATED CONTRAST CHECK (catches white-on-white, etc.)
			test("passes accessibility contrast checks", async ({ page }) => {
				// Check if component preview exists - some pages may not have one
				const preview = page.locator(".component-preview").first();
				const hasPreview = (await preview.count()) > 0;

				if (!hasPreview) {
					// Skip test for pages without component preview
					test.skip();
					return;
				}

				// Only check component preview areas, not the docs site navigation
				const results = await new AxeBuilder({ page })
					.include(".component-preview")
					.withTags(["wcag2aa"]) // WCAG 2.1 AA contrast rules
					.analyze();

				// Filter to color-contrast violations only
				const contrastViolations = results.violations.filter(
					(v) => v.id === "color-contrast",
				);

				if (contrastViolations.length > 0) {
					// Log detailed info about failures
					for (const violation of contrastViolations) {
						console.error(`Contrast violation: ${violation.help}`);
						for (const node of violation.nodes) {
							console.error(`  Element: ${node.html}`);
							console.error(`  Issue: ${node.failureSummary}`);
						}
					}
				}

				expect(contrastViolations).toEqual([]);
			});

			// 2. VISUAL BASELINE - Base state
			test("base state matches baseline", async ({ page }, testInfo) => {
				const theme = getThemeFromProject(testInfo);
				// Find the component preview area - look for the first preview container
				const preview = page.locator(".component-preview").first();

				// Only run if preview exists
				if ((await preview.count()) > 0) {
					await expect(preview).toHaveScreenshot(
						`${component}-${theme}-base.png`,
						{ maxDiffPixelRatio: 0.02 },
					);
				}
			});

			// 3. VISUAL BASELINE - Hover state
			test("hover state matches baseline", async ({ page }, testInfo) => {
				const theme = getThemeFromProject(testInfo);
				const preview = page.locator(".component-preview").first();

				if ((await preview.count()) === 0) return;

				const interactive = preview
					.locator('button, input, [role="button"]')
					.first();

				if ((await interactive.count()) > 0) {
					await interactive.hover();
					await page.waitForTimeout(200); // Wait for hover animation

					await expect(preview).toHaveScreenshot(
						`${component}-${theme}-hover.png`,
						{ maxDiffPixelRatio: 0.02 },
					);
				}
			});

			// 4. VISUAL BASELINE - Focus state
			test("focus state matches baseline", async ({ page }, testInfo) => {
				const theme = getThemeFromProject(testInfo);
				const preview = page.locator(".component-preview").first();

				if ((await preview.count()) === 0) return;

				const focusable = preview
					.locator('button, input, [tabindex="0"]')
					.first();

				if ((await focusable.count()) > 0) {
					await focusable.focus();
					await page.waitForTimeout(150);

					await expect(preview).toHaveScreenshot(
						`${component}-${theme}-focus.png`,
						{ maxDiffPixelRatio: 0.02 },
					);
				}
			});

			// 5. VISUAL BASELINE - Active/pressed state
			test("active state matches baseline", async ({ page }, testInfo) => {
				const theme = getThemeFromProject(testInfo);
				const preview = page.locator(".component-preview").first();

				if ((await preview.count()) === 0) return;

				const clickable = preview.locator('button, [role="button"]').first();

				if ((await clickable.count()) > 0) {
					await clickable.dispatchEvent("mousedown");
					await page.waitForTimeout(100);

					await expect(preview).toHaveScreenshot(
						`${component}-${theme}-active.png`,
						{ maxDiffPixelRatio: 0.02 },
					);

					await clickable.dispatchEvent("mouseup");
				}
			});
		});
	}
});
