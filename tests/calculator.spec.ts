import { test, expect } from '@playwright/test';
import { CalculatorPage } from './calculator.page';
import calData from './calculator.data.json';

test.describe('test_suite', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('');
  });

  test('TC1: Verify the initial load of Simple Calculator page', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    // Both input fields are empty.
    await expect(calPage.num1, `1st input field should be empty.`).toBeEmpty();
    await expect(calPage.num2, `2nd input field should be empty.`).toBeEmpty();
    // Both input fields are enabled.
    await expect(calPage.num1, `1st input field should be editable.`).toBeEditable();
    await expect(calPage.num2, `2nd input field should be editable.`).toBeEditable();
    // "plus" is selected in the dropdown.
    await expect(calPage.func, `Plus function should be selected.`).toHaveValue(calData.func.plus);
    // dropdown is enabled.
    await expect(calPage.func, `Dropdown should be enabled.`).toBeEnabled();
    // Calculate button is displayed.
    await expect(calPage.calcBtn, `Calculate button should be displayed.`).toBeVisible();
    // Calculate button is enabled.
    await expect(calPage.calcBtn, `Calculate button should be enabled.`).toBeEnabled();
    // "Answer : " label is displayed.
    await expect(calPage.answerLabel, "Answer label should be displayed.").toBeVisible();
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});

