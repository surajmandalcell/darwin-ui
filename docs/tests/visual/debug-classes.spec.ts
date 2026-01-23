import { test } from "@playwright/test";

test("debug accordion CSS classes", async ({ page }) => {
	await page.goto("/docs/components/accordion");

	// Set light mode
	await page.evaluate(() => {
		localStorage.setItem("darwin-ui-theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
		document.documentElement.classList.remove("dark");
	});

	await page.waitForTimeout(500);

	const classInfo = await page.evaluate(() => {
		const trigger = document.querySelector("button[aria-expanded]");
		if (!trigger) return null;

		return {
			className: trigger.className,
			computedColor: window.getComputedStyle(trigger).color,
			htmlClasses: document.documentElement.className,
			htmlDataTheme: document.documentElement.getAttribute("data-theme"),
		};
	});

	console.log("=== CSS CLASS DEBUG ===");
	console.log("Trigger classes:", classInfo?.className);
	console.log("Computed color:", classInfo?.computedColor);
	console.log("HTML classes:", classInfo?.htmlClasses);
	console.log("HTML data-theme:", classInfo?.htmlDataTheme);
});
