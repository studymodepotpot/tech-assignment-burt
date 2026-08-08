import { test, expect } from '@playwright/test';
import { CalculatorPage } from './calculator.page';
import calData from './calculator.data.json';

test.describe('test_suite', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('');
  });

  //Critical: UI
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
    await expect(calPage.calcBtn, `Calculate button label should be correct.`).toHaveText(calData.calBtnLabel);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
  });

  //Critical: functionality
  test.skip('TC21: Verify the divide function with divisor = 0', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 10;
    let num2: number = 0;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText('undefined');
  });

  //Critical: functionality
  test('TC24: Verify the divide function for positive word numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 15;
    let wordNum1: string = 'fifteen';
    let num2: number = 3;
    let wordNum2: string = 'three';
    let answer: number = num1/num2;
    // first input field has word number
    await calPage.compute(wordNum1, num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${wordNum1} and ${num2} is displayed.`).toHaveText(answer.toString());
    // second input field has word number
    await calPage.compute(num1.toString(), wordNum2, calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
    // both input fields have word numbers
    await calPage.compute(wordNum1, wordNum2, calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${wordNum1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
  });

  //Critical: UI
  test('TC37: Verify that the Calculator is working correctly after changing the browser window to mobile-size', async ({page}) => {
    const calPage = new CalculatorPage(page);
    //resize window
    await page.setViewportSize({ width: 390, height: 844 }); // standard phone model viewport size (e.g iPhone 13, 14, 15)
    await expect(calPage.num1, `1st input field should be empty.`).toBeEmpty();
    await expect(calPage.num2, `2nd input field should be empty.`).toBeEmpty();
    await expect(calPage.num1, `1st input field should be editable.`).toBeEditable();
    await expect(calPage.num2, `2nd input field should be editable.`).toBeEditable();
    await expect(calPage.func, `Plus function should be selected.`).toHaveValue(calData.func.plus);
    await expect(calPage.func, `Dropdown should be enabled.`).toBeEnabled();
    await expect(calPage.calcBtn, `Calculate button should be displayed.`).toBeVisible();
    await expect(calPage.calcBtn, `Calculate button should be enabled.`).toBeEnabled();
    await expect(calPage.calcBtn, `Calculate button label should be correct.`).toHaveText(calData.calBtnLabel);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    //simple calculation should still work
    let num1: number = 12;
    let num2: number = 34;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});

