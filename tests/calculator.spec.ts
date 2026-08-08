import { test, expect } from '@playwright/test';
import { CalculatorPage } from './calculator.page';
import calData from './calculator.data.json';

test.describe('test_suite', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('');
  });

  test('TC1: Verify the initial load of Simple Calculator page', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    await expect(calPage.num1, `1st input field should be empty.`).toBeEmpty();
    await expect(calPage.num2, `2nd input field should be empty.`).toBeEmpty();
    await expect(calPage.num1, `1st input field should be editable.`).toBeEditable();
    await expect(calPage.num2, `2nd input field should be editable.`).toBeEditable();
    await expect(calPage.func, `Plus function should be selected.`).toHaveValue(calData.func.plus);
    await expect(calPage.func, `Dropdown should be enabled.`).toBeEnabled();
    await expect(calPage.calcBtn, `Calculate button should be displayed.`).toBeVisible();
    await expect(calPage.calcBtn, `Calculate button should be enabled.`).toBeEnabled();
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
  });

  test('TC2: Verify the plus function for positive number + positive', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = 12;
    let posNum2: number = 34;
    let sumVal: number = posNum1 + posNum2;
    await calPage.compute(posNum1.toString(), posNum2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posNum1} and ${posNum2} is displayed.`).toHaveText(sumVal.toString());
  });

  test('TC3: Verify the plus function for a positive word number + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = 40;
    let posWordNum1: string = 'forty';
    let posNum2: number = 10;
    let posWordNum2: string = 'ten';
    let sumVal: number = posNum1 + posNum2;
    // first input field has word number
    await calPage.compute(posWordNum1, posNum2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posWordNum1} and ${posNum2} is displayed.`).toHaveText(sumVal.toString());
    // second input field has word number
    await calPage.compute(posNum1.toString(), posWordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posNum1} and ${posWordNum2} is displayed.`).toHaveText(sumVal.toString());
    // both input fields have word numbers
    await calPage.compute(posWordNum1, posWordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posWordNum1} and ${posWordNum2} is displayed.`).toHaveText(sumVal.toString());
  });

  test('TC4: Verify the plus function for negative number + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = -40;
    let posNum2: number = 10;
    let sumVal: number = posNum1 + posNum2;
    await calPage.compute(posNum1.toString(), posNum2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posNum1} and ${posNum2} is displayed.`).toHaveText(sumVal.toString());
  });

  test('TC5: Verify the plus function for zero + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = 0;
    let posNum2: number = 10;
    let sumVal: number = posNum1 + posNum2;
    await calPage.compute(posNum1.toString(), posNum2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posNum1} and ${posNum2} is displayed.`).toHaveText(sumVal.toString());
  });

  test('TC6: Verify the plus function for decimal numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = 1.5;
    let posNum2: number = 4.5;
    let sumVal: number = posNum1 + posNum2;
    await calPage.compute(posNum1.toString(), posNum2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${posNum1} and ${posNum2} is displayed.`).toHaveText(sumVal.toString());
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});

