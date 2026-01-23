import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/visual",
	outputDir: "./test-results",
	snapshotDir: "./tests/visual/__snapshots__",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 3,
	reporter: [["html", { outputFolder: "playwright-report" }]],
	use: {
		baseURL: "http://localhost:4200",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},
	projects: [
		{
			name: "light-mode",
			use: { ...devices["Desktop Chrome"], colorScheme: "light" },
		},
		{
			name: "dark-mode",
			use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
		},
	],
	webServer: {
		command: "npm run dev",
		url: "http://localhost:4200",
		reuseExistingServer: !process.env.CI,
	},
});
