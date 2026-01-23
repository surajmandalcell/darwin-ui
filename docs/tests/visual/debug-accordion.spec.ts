import { test, expect } from "@playwright/test";

test("debug accordion visibility in light mode", async ({ page }) => {
	// Go to accordion page
	await page.goto("/docs/components/accordion");

	// Set light mode
	await page.evaluate(() => {
		localStorage.setItem("darwin-ui-theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
		document.documentElement.classList.remove("dark");
	});

	// Wait for theme to apply
	await page.waitForTimeout(500);

	// Take full page screenshot
	await page.screenshot({
		path: "test-results/accordion-light-mode-debug.png",
		fullPage: false,
	});

	// Find the accordion trigger text and get its computed styles
	const triggerInfo = await page.evaluate(() => {
		const triggers = document.querySelectorAll("button[aria-expanded]");
		const results: Array<{
			text: string;
			color: string;
			backgroundColor: string;
			parentBg: string;
			allParentBgs: string[];
		}> = [];

		for (const trigger of triggers) {
			const style = window.getComputedStyle(trigger);
			const text = trigger.textContent || "";

			// Walk up the DOM to find actual background
			const parentBgs: string[] = [];
			let el: Element | null = trigger;
			while (el) {
				const elStyle = window.getComputedStyle(el);
				const bg = elStyle.backgroundColor;
				if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
					parentBgs.push(`${el.tagName}.${el.className.split(" ")[0]}: ${bg}`);
				}
				el = el.parentElement;
			}

			results.push({
				text: text.substring(0, 50),
				color: style.color,
				backgroundColor: style.backgroundColor,
				parentBg:
					parentBgs[0] || "none found (transparent all the way up)",
				allParentBgs: parentBgs,
			});
		}
		return results;
	});

	console.log("=== ACCORDION TRIGGER DEBUG INFO ===");
	for (const info of triggerInfo) {
		console.log(`Text: "${info.text}"`);
		console.log(`  Text color: ${info.color}`);
		console.log(`  Element bg: ${info.backgroundColor}`);
		console.log(`  First parent with bg: ${info.parentBg}`);
		console.log(`  All parent backgrounds:`, info.allParentBgs);
		console.log("---");
	}

	// Get the actual accordion component's rendered colors
	const accordionStyles = await page.evaluate(() => {
		const accordion = document.querySelector(".component-preview");
		if (!accordion) return null;

		const style = window.getComputedStyle(accordion);
		return {
			color: style.color,
			backgroundColor: style.backgroundColor,
		};
	});

	console.log("=== COMPONENT PREVIEW STYLES ===");
	console.log(accordionStyles);
});
