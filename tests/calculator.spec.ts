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
    let num1: number = 12;
    let num2: number = 34;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC3: Verify the plus function for a positive word number + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 40;
    let wordNum1: string = 'forty';
    let num2: number = 10;
    let wordNum2: string = 'ten';
    let answer: number = num1 + num2;
    // first input field has word number
    await calPage.compute(wordNum1, num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${wordNum1} and ${num2} is displayed.`).toHaveText(answer.toString());
    // second input field has word number
    await calPage.compute(num1.toString(), wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
    // both input fields have word numbers
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${wordNum1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC4: Verify the plus function for negative number + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = -40;
    let num2: number = 10;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC5: Verify the plus function for zero + positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 0;
    let num2: number = 10;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC6: Verify the plus function for decimal numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 1.5;
    let num2: number = 4.5;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC7: Verify the times function for positive number * positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 5;
    let num2: number = 8;
    let answer: number = num1 * num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC8: Verify the times function for positive number * zero', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let posNum1: number = 5;
    let posNum2: number = 0;
    let answer: number = posNum1 * posNum2;
    await calPage.compute(posNum1.toString(), posNum2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${posNum1} and ${posNum2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC9: Verify the times function for negative number * positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = -5;
    let num2: number = 8;
    let answer: number = num1 * num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC10: Verify the times function for decimal numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 8.8;
    let num2: number = 7.2;
    let answer: number = num1 * num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${num1} and ${num2} is displayed.`).toHaveText(answer.toFixed(2).toString());
  });

  test('TC11: Verify the times function for positive word numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 5;
    let wordNum1: string = 'five';
    let num2: number = 8;
    let wordNum2: string = 'eight';
    let answer: number = num1 * num2;
    // first input field has word number
    await calPage.compute(wordNum1, num2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${wordNum1} and ${num2} is displayed.`).toHaveText(answer.toString());
    // second input field has word number
    await calPage.compute(num1.toString(), wordNum2, calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${num1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
    // both input fields have word numbers
    await calPage.compute(wordNum1, wordNum2, calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${wordNum1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC12: Verify the times function for large numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 9999999999;
    let num2: number = 9999999999;
    let answer: number = num1 * num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.times);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Product of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});

