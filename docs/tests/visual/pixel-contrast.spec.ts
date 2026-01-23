import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import * as fs from "node:fs";

/**
 * Calculate relative luminance per WCAG 2.1
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
	const [rs, gs, bs] = [r, g, b].map((c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(
	l1: number,
	l2: number,
): number {
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Sample colors from a specific element by taking a screenshot
 * and analyzing pixels in the bounding box
 */
async function getElementColors(
	page: any,
	selector: string,
): Promise<{ textColor: { r: number; g: number; b: number } | null; bgColor: { r: number; g: number; b: number } }> {
	const element = page.locator(selector).first();
	const box = await element.boundingBox();
	if (!box) throw new Error(`Element not found: ${selector}`);

	// Take screenshot of just this element
	const screenshotBuffer = await element.screenshot();

	// Parse the PNG
	const png = PNG.sync.read(screenshotBuffer);
	const { width, height, data } = png;

	// Collect all unique colors and their frequency
	const colorCounts = new Map<string, { r: number; g: number; b: number; count: number }>();

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
				colorCounts.set(key, { r, g, b, count: 1 });
			}
		}
	}

	// Sort by frequency
	const sortedColors = [...colorCounts.values()].sort((a, b) => b.count - a.count);

	// Background is usually the most common color
	const bgColor = sortedColors[0];

	// Text color is usually the second most common, or a dark/light color different from bg
	let textColor: { r: number; g: number; b: number } | null = null;
	for (const color of sortedColors.slice(1)) {
		// Skip colors too similar to background
		const bgLum = getLuminance(bgColor.r, bgColor.g, bgColor.b);
		const colorLum = getLuminance(color.r, color.g, color.b);
		const contrast = getContrastRatio(bgLum, colorLum);

		if (contrast > 1.5) {
			// Found a significantly different color
			textColor = color;
			break;
		}
	}

	return { bgColor, textColor };
}

test.describe("Pixel-Based Contrast Validation", () => {
	test.beforeEach(async ({ page }) => {
		// Clear any stored theme
		await page.addInitScript(() => {
			localStorage.clear();
		});
	});

	test("accordion trigger has sufficient contrast in light mode", async ({
		page,
	}, testInfo) => {
		// Skip if not light mode project
		if (!testInfo.project.name.includes("light")) {
			test.skip();
			return;
		}

		await page.goto("/docs/components/accordion");

		// Force light theme
		await page.evaluate(() => {
			localStorage.setItem("darwin-ui-theme", "light");
			document.documentElement.setAttribute("data-theme", "light");
			document.documentElement.classList.remove("dark");
		});
		await page.waitForTimeout(500);

		// Get the first accordion trigger button
		const trigger = page.locator('button[aria-expanded]').first();
		await trigger.waitFor({ state: "visible" });

		// Take a screenshot of just the trigger
		const screenshot = await trigger.screenshot();
		fs.writeFileSync("test-results/accordion-trigger-light.png", screenshot);

		// Parse and analyze
		const png = PNG.sync.read(screenshot);
		const { width, height, data } = png;

		// Collect colors
		const colorCounts = new Map<string, { r: number; g: number; b: number; count: number }>();
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
					colorCounts.set(key, { r, g, b, count: 1 });
				}
			}
		}

		const sortedColors = [...colorCounts.values()].sort((a, b) => b.count - a.count);
		console.log("Top 5 colors in accordion trigger:");
		for (const color of sortedColors.slice(0, 5)) {
			const lum = getLuminance(color.r, color.g, color.b);
			console.log(
				`  rgb(${color.r}, ${color.g}, ${color.b}) - ${color.count} pixels, luminance: ${lum.toFixed(3)}`,
			);
		}

		// Background should be the most common
		const bgColor = sortedColors[0];
		const bgLuminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
		console.log(
			`\nBackground: rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}), luminance: ${bgLuminance.toFixed(3)}`,
		);

		// Find text color (different from background, significant pixel count)
		let textColor = null;
		let textContrast = 0;
		for (const color of sortedColors.slice(1)) {
			if (color.count < width * 2) continue; // Skip noise (less than 2 rows of pixels)

			const colorLum = getLuminance(color.r, color.g, color.b);
			const contrast = getContrastRatio(bgLuminance, colorLum);

			if (contrast > textContrast) {
				textColor = color;
				textContrast = contrast;
			}
		}

		if (textColor) {
			console.log(
				`Text: rgb(${textColor.r}, ${textColor.g}, ${textColor.b}), contrast ratio: ${textContrast.toFixed(2)}:1`,
			);
		} else {
			console.log("WARNING: Could not identify distinct text color!");
		}

		// WCAG AA requires 4.5:1 for normal text
		const WCAG_AA_RATIO = 4.5;

		if (textColor) {
			expect(
				textContrast,
				`Text contrast ${textContrast.toFixed(2)}:1 is below WCAG AA minimum of ${WCAG_AA_RATIO}:1`,
			).toBeGreaterThanOrEqual(WCAG_AA_RATIO);
		} else {
			// If we can't find text, that's a failure - text should be visible!
			expect(textColor, "Could not find any text color distinct from background").not.toBeNull();
		}
	});

	test("accordion trigger has sufficient contrast in dark mode", async ({
		page,
	}, testInfo) => {
		// Skip if not dark mode project
		if (!testInfo.project.name.includes("dark")) {
			test.skip();
			return;
		}

		await page.goto("/docs/components/accordion");

		// Force dark theme
		await page.evaluate(() => {
			localStorage.setItem("darwin-ui-theme", "dark");
			document.documentElement.setAttribute("data-theme", "dark");
			document.documentElement.classList.add("dark");
		});
		await page.waitForTimeout(500);

		const trigger = page.locator('button[aria-expanded]').first();
		await trigger.waitFor({ state: "visible" });

		const screenshot = await trigger.screenshot();
		fs.writeFileSync("test-results/accordion-trigger-dark.png", screenshot);

		const png = PNG.sync.read(screenshot);
		const { width, height, data } = png;

		const colorCounts = new Map<string, { r: number; g: number; b: number; count: number }>();
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
					colorCounts.set(key, { r, g, b, count: 1 });
				}
			}
		}

		const sortedColors = [...colorCounts.values()].sort((a, b) => b.count - a.count);
		console.log("Top 5 colors in accordion trigger (dark mode):");
		for (const color of sortedColors.slice(0, 5)) {
			const lum = getLuminance(color.r, color.g, color.b);
			console.log(
				`  rgb(${color.r}, ${color.g}, ${color.b}) - ${color.count} pixels, luminance: ${lum.toFixed(3)}`,
			);
		}

		const bgColor = sortedColors[0];
		const bgLuminance = getLuminance(bgColor.r, bgColor.g, bgColor.b);
		console.log(
			`\nBackground: rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}), luminance: ${bgLuminance.toFixed(3)}`,
		);

		let textColor = null;
		let textContrast = 0;
		for (const color of sortedColors.slice(1)) {
			if (color.count < width * 2) continue;

			const colorLum = getLuminance(color.r, color.g, color.b);
			const contrast = getContrastRatio(bgLuminance, colorLum);

			if (contrast > textContrast) {
				textColor = color;
				textContrast = contrast;
			}
		}

		if (textColor) {
			console.log(
				`Text: rgb(${textColor.r}, ${textColor.g}, ${textColor.b}), contrast ratio: ${textContrast.toFixed(2)}:1`,
			);
		}

		const WCAG_AA_RATIO = 4.5;
		if (textColor) {
			expect(
				textContrast,
				`Text contrast ${textContrast.toFixed(2)}:1 is below WCAG AA minimum of ${WCAG_AA_RATIO}:1`,
			).toBeGreaterThanOrEqual(WCAG_AA_RATIO);
		} else {
			expect(textColor, "Could not find any text color distinct from background").not.toBeNull();
		}
	});
});
