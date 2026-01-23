import { test } from '@playwright/test';

test('screenshot pie and donut charts', async ({ page }) => {
  await page.goto('http://localhost:4200/docs/components/charts');
  await page.waitForTimeout(2000);

  // Click on Pie button
  await page.click('button:has-text("Pie")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/charts-pie.png', fullPage: false });

  // Click on Donut button  
  await page.click('button:has-text("Donut")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/charts-donut.png', fullPage: false });
});
