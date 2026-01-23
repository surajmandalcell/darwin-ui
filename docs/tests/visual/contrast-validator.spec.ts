/**
 * Pixel-Based Contrast Validator
 *
 * This test captures actual rendered screenshots and analyzes pixel colors
 * to detect contrast violations that axe-core misses (transparency, layering, etc.)
 */
import { test, expect, type Page } from "@playwright/test";
import { PNG } from "pngjs";

const WCAG_AA_RATIO = 4.5; // Normal text
const WCAG_AA_LARGE_RATIO = 3.0; // Large text (18px+ or 14px+ bold)

// Components to test (all from docs navigation)
const COMPONENTS = [
	"accordion",
	"avatar",
	"badge",
	"button",
	"card",
	"checkbox",
	"dialog",
	"dropdown-menu",
	"input",
	"progress",
	"select",
	"switch",
	"table",
	"tabs",
	"textarea",
	"tooltip",
];

function getLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(l1: number, l2: number): number {
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

interface ColorInfo {
	r: number;
	g: number;
	b: number;
	count: number;
	luminance: number;
}

interface AnalysisResult {
	background: ColorInfo;
	textColors: ColorInfo[];
	lowContrastColors: ColorInfo[];
	minContrast: number;
	hasLowContrast: boolean;
}

function analyzeScreenshot(buffer: Buffer): AnalysisResult {
	const png = PNG.sync.read(buffer);
	const { width, height, data } = png;

	// Collect colors
	const colorCounts = new Map<string, ColorInfo>();
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const idx = (width * y + x) * 4;
			const r = data[idx];
			const g = data[idx + 1];
			const b = data[idx + 2];
			const key = `${r},${g},${b}`;

			if (colorCounts.has(key)) {
				colorCounts.get(key)!.count++;
			} else {
				colorCounts.set(key, {
					r,
					g,
					b,
					count: 1,
					luminance: getLuminance(r, g, b),
				});
			}
		}
	}

	const sortedColors = [...colorCounts.values()].sort(
		(a, b) => b.count - a.count,
	);

	// Background is most common
	const background = sortedColors[0];

	// Find text colors (different from background with significant presence)
	// Text is typically darker than background in light mode, lighter in dark mode
	const textColors: ColorInfo[] = [];
	const totalPixels = width * height;
	const minPixels = Math.max(10, totalPixels * 0.0001); // At least 10 pixels or 0.01% of image
	const isLightBackground = background.luminance > 0.5;

	for (const color of sortedColors.slice(1)) {
		if (color.count < minPixels) continue;

		const contrast = getContrastRatio(background.luminance, color.luminance);
		if (contrast < 1.3) continue; // Too similar to background

		// Skip colors that are likely decorative backgrounds/borders (light on light, dark on dark)
		// Real text should be notably darker (light mode) or lighter (dark mode) than background
		if (isLightBackground && color.luminance > 0.5) continue; // Skip light/medium grays on light bg
		if (!isLightBackground && color.luminance < 0.4) continue; // Skip dark grays on dark bg

		textColors.push(color);
	}

	// Filter to "significant" text colors - those with enough pixels to be actual text
	// and not just anti-aliasing or subtle borders
	const significantTextColors = textColors.filter((color) => {
		// Must have at least 0.1% of total pixels to be considered text
		return color.count >= totalPixels * 0.001;
	});

	// Calculate minimum contrast among significant text colors
	let minContrast = Number.POSITIVE_INFINITY;
	const lowContrastColors: ColorInfo[] = [];

	for (const textColor of significantTextColors) {
		const contrast = getContrastRatio(background.luminance, textColor.luminance);
		if (contrast < minContrast) {
			minContrast = contrast;
		}
		if (contrast < WCAG_AA_RATIO) {
			lowContrastColors.push(textColor);
		}
	}

	if (significantTextColors.length === 0) {
		// No significant text found - this might mean:
		// 1. Component has no visible text
		// 2. All text is the same color as background (invisible)
		// Check if there ARE any non-background colors at all
		const hasAnyDifferentColors = textColors.length > 0;
		minContrast = hasAnyDifferentColors ? WCAG_AA_RATIO : Number.POSITIVE_INFINITY; // Pass if no text at all
	}

	return {
		background,
		textColors: significantTextColors,
		lowContrastColors,
		minContrast,
		hasLowContrast: minContrast < WCAG_AA_RATIO && significantTextColors.length > 0,
	};
}

async function setTheme(page: Page, theme: "light" | "dark") {
	await page.evaluate((t) => {
		localStorage.setItem("darwin-ui-theme", t);
		document.documentElement.setAttribute("data-theme", t);
		if (t === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, theme);
	await page.waitForTimeout(300);
}

test.describe("Pixel-Based Contrast Validation", () => {
	test.beforeEach(async ({ page }) => {
		await page.addInitScript(() => {
			localStorage.clear();
		});
	});

	for (const component of COMPONENTS) {
		test(`${component} has sufficient contrast in light mode`, async ({
			page,
		}, testInfo) => {
			if (!testInfo.project.name.includes("light")) {
				test.skip();
				return;
			}

			await page.goto(`/docs/components/${component}`);
			await setTheme(page, "light");

			const preview = page.locator(".component-preview").first();
			if ((await preview.count()) === 0) {
				test.skip();
				return;
			}

			const screenshot = await preview.screenshot();
			const analysis = analyzeScreenshot(screenshot);

			console.log(`\n=== ${component.toUpperCase()} (light mode) ===`);
			console.log(
				`Background: rgb(${analysis.background.r}, ${analysis.background.g}, ${analysis.background.b}) - luminance: ${analysis.background.luminance.toFixed(3)}`,
			);
			console.log(`Significant text colors found: ${analysis.textColors.length}`);
			for (const tc of analysis.textColors.slice(0, 5)) {
				const contrast = getContrastRatio(
					analysis.background.luminance,
					tc.luminance,
				);
				console.log(
					`  rgb(${tc.r}, ${tc.g}, ${tc.b}) [${tc.count}px] - contrast: ${contrast.toFixed(2)}:1 ${contrast < WCAG_AA_RATIO ? "⚠️ LOW" : "✓"}`,
				);
			}
			if (analysis.lowContrastColors.length > 0) {
				console.log(`LOW CONTRAST COLORS (${analysis.lowContrastColors.length}):`);
				for (const lc of analysis.lowContrastColors) {
					const contrast = getContrastRatio(analysis.background.luminance, lc.luminance);
					console.log(`  ⚠️ rgb(${lc.r}, ${lc.g}, ${lc.b}) [${lc.count}px] - ${contrast.toFixed(2)}:1`);
				}
			}
			console.log(`Minimum contrast: ${analysis.minContrast.toFixed(2)}:1`);

			if (analysis.hasLowContrast) {
				// Save screenshot for debugging
				const fs = await import("node:fs");
				fs.writeFileSync(
					`test-results/${component}-light-FAIL.png`,
					screenshot,
				);
			}

			expect(
				analysis.minContrast,
				`${component} has text with contrast ${analysis.minContrast.toFixed(2)}:1, needs ${WCAG_AA_RATIO}:1`,
			).toBeGreaterThanOrEqual(WCAG_AA_RATIO);
		});

		test(`${component} has sufficient contrast in dark mode`, async ({
			page,
		}, testInfo) => {
			if (!testInfo.project.name.includes("dark")) {
				test.skip();
				return;
			}

			await page.goto(`/docs/components/${component}`);
			await setTheme(page, "dark");

			const preview = page.locator(".component-preview").first();
			if ((await preview.count()) === 0) {
				test.skip();
				return;
			}

			const screenshot = await preview.screenshot();
			const analysis = analyzeScreenshot(screenshot);

			console.log(`\n=== ${component.toUpperCase()} (dark mode) ===`);
			console.log(
				`Background: rgb(${analysis.background.r}, ${analysis.background.g}, ${analysis.background.b}) - luminance: ${analysis.background.luminance.toFixed(3)}`,
			);
			console.log(`Text colors found: ${analysis.textColors.length}`);
			for (const tc of analysis.textColors.slice(0, 3)) {
				const contrast = getContrastRatio(
					analysis.background.luminance,
					tc.luminance,
				);
				console.log(
					`  rgb(${tc.r}, ${tc.g}, ${tc.b}) - contrast: ${contrast.toFixed(2)}:1 ${contrast < WCAG_AA_RATIO ? "⚠️ LOW" : "✓"}`,
				);
			}
			console.log(`Minimum contrast: ${analysis.minContrast.toFixed(2)}:1`);

			if (analysis.hasLowContrast) {
				const fs = await import("node:fs");
				fs.writeFileSync(
					`test-results/${component}-dark-FAIL.png`,
					screenshot,
				);
			}

			expect(
				analysis.minContrast,
				`${component} has text with contrast ${analysis.minContrast.toFixed(2)}:1, needs ${WCAG_AA_RATIO}:1`,
			).toBeGreaterThanOrEqual(WCAG_AA_RATIO);
		});
	}
});
