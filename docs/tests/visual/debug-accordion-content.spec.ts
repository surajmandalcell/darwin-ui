import { test } from "@playwright/test";

test("debug accordion CONTENT visibility", async ({ page }) => {
	await page.goto("/docs/components/accordion");

	// Force light theme
	await page.evaluate(() => {
		localStorage.setItem("darwin-ui-theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
		document.documentElement.classList.remove("dark");
	});
	await page.waitForTimeout(500);

	// Click to expand the first accordion
	const trigger = page.locator('button[aria-expanded="false"]').first();
	if ((await trigger.count()) > 0) {
		await trigger.click();
		await page.waitForTimeout(300);
	}

	// Take a screenshot of the expanded accordion
	await page.screenshot({ path: "test-results/accordion-expanded-light.png" });

	// Get the accordion content styles
	const contentInfo = await page.evaluate(() => {
		// Find all accordion content text
		const contents = document.querySelectorAll('[class*="AccordionContent"], [role="region"]');
		const results: Array<{
			text: string;
			color: string;
			bgStack: string[];
		}> = [];

		for (const content of contents) {
			const style = window.getComputedStyle(content);
			const text = (content.textContent || "").substring(0, 100);

			// Walk up to find backgrounds
			const bgStack: string[] = [];
			let el: Element | null = content;
			while (el) {
				const elStyle = window.getComputedStyle(el);
				const bg = elStyle.backgroundColor;
				if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
					bgStack.push(`${el.tagName}: ${bg}`);
				}
				el = el.parentElement;
			}

			results.push({
				text,
				color: style.color,
				bgStack,
			});
		}

		// Also check any pb-4 text-sm divs (accordion content style)
		const textDivs = document.querySelectorAll('.pb-4.text-sm');
		for (const div of textDivs) {
			const style = window.getComputedStyle(div);
			results.push({
				text: (div.textContent || "").substring(0, 100),
				color: style.color,
				bgStack: ["Found via .pb-4.text-sm selector"],
			});
		}

		return results;
	});

	console.log("=== ACCORDION CONTENT DEBUG ===");
	for (const info of contentInfo) {
		console.log(`Text: "${info.text.substring(0, 50)}..."`);
		console.log(`  Text color: ${info.color}`);
		console.log(`  Background stack: ${info.bgStack.join(" -> ")}`);
		console.log("---");
	}
});
