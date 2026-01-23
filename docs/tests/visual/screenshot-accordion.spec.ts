import { test } from "@playwright/test";

test("screenshot accordion in light mode", async ({ page }) => {
	await page.goto("/docs/components/accordion");

	await page.evaluate(() => {
		localStorage.setItem("darwin-ui-theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
		document.documentElement.classList.remove("dark");
	});
	await page.waitForTimeout(500);

	// Expand all accordions
	const triggers = page.locator('button[aria-expanded="false"]');
	const count = await triggers.count();
	for (let i = 0; i < count; i++) {
		await triggers.nth(0).click();
		await page.waitForTimeout(200);
	}

	// Screenshot the component preview
	const preview = page.locator(".component-preview").first();
	await preview.screenshot({ path: "test-results/accordion-fixed-light.png" });
});
