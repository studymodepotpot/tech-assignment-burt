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

  test('TC13: Verify the minus function for positive - positive = positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 30;
    let num2: number = 7;
    let answer: number = num1 - num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC14: Verify the minus function for positive - positive = negative number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 7;
    let num2: number = 30;
    let answer: number = num1 - num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC15: Verify the minus function for same number in both input fields', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 30;
    let num2: number = 30;
    let answer: number = num1 - num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC16: Verify the minus function for negative - positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = -48;
    let num2: number = 67;
    let answer: number = num1 - num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC17: Verify the minus function for decimal numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 8.1;
    let num2: number = 68.2;
    let answer: number = num1 - num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC18: Verify the minus function for positive word numbers', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 30;
    let wordNum1: string = 'thirty';
    let num2: number = 7;
    let wordNum2: string = 'seven';
    let answer: number = num1 - num2;
    // first input field has word number
    await calPage.compute(wordNum1, num2.toString(), calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${wordNum1} and ${num2} is displayed.`).toHaveText(answer.toString());
    // second input field has word number
    await calPage.compute(num1.toString(), wordNum2, calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${num1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
    // both input fields have word numbers
    await calPage.compute(wordNum1, wordNum2, calData.func.minus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Difference of ${wordNum1} and ${wordNum2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC19: Verify the divide function for even division', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 15;
    let num2: number = 3;
    let answer: number = num1/num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC20: Verify the divide function for numbers with remainder/decimal result', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 10;
    let num2: number = 4;
    let answer: number = num1/num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test.skip('TC21: Verify the divide function with divisor = 0', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 10;
    let num2: number = 0;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText('undefined');
  });

  test('TC22: Verify the divide function with dividend = 0', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 0;
    let num2: number = 3;
    let answer: number = num1/num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

  test('TC23: Verify the divide function with dividend = negative number and divisor = positive number', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = -15;
    let num2: number = 3;
    let answer: number = num1/num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.divide);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Quotient of ${num1} and ${num2} is displayed.`).toHaveText(answer.toString());
  });

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

  test('TC25: Verify the error handling for empty input fields', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: string = '';
    let num2: string = '';
    await calPage.compute(num1, num2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Error message for empty input field should display.`).toHaveText(calData.err.empty);
  });

  test('TC26: Verify the error handling for text without equivalent number value ("abc") in input fields', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    // both inputs have no equivalent number value
    let num1: string = 'abc';
    let num2: string = 'cba';
    await calPage.compute(num1, num2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Error message for non-numeric text should display.`).toHaveText(`${calData.err.notNum} ${num1}`);
    // second input has no equivalent number value
    num1 = '1';
    num2 = 'cba';
    await calPage.compute(num1, num2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Error message for non-numeric text should display.`).toHaveText(`${calData.err.notNum} ${num2}`);
    // first input has no equivalent number value
    num1 = 'abc';
    num2 = '1';
    await calPage.compute(num1, num2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Error message for non-numeric text should display.`).toHaveText(`${calData.err.notNum} ${num1}`);
  });

  test.skip('TC27: Verify the error handling of other word numbers as input ("hundred", "thousand")', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: string = 'ten';
    let num2: string = 'hundred';
    await calPage.compute(num1, num2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Error message for input that is not a number should display.`).toHaveText(calData.err.notNum);
  });

  test.skip('TC28: Verify that negative word numbers are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = -40;
    let wordNum1: string = 'negative forty';
    let num2: number = 10;
    let wordNum2: string = 'ten';
    let answer: number = num1 + num2;
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${wordNum1} and ${wordNum2} should display.`).toHaveText(answer.toString());
  });

  test.skip('TC29: Verify that decimal numbers in word form are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 1.5;
    let wordNum1: string = 'one point five';
    let num2: number = 4.8;
    let wordNum2: string = 'four point eight';
    let answer: number = num1 + num2;
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${wordNum1} and ${wordNum2} should display.`).toHaveText(answer.toString());
  });

  test.skip('TC30: Verify that long numeric string (bigint) are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: bigint = 12345678901234567890n;
    let num2: bigint = 1n;
    let answer: bigint = num1 + num2;
    let finalAns: string = answer.toString().replace("n", "");
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${num1} and ${num2} should display.`).toHaveText(finalAns);
  });

  test('TC31: Verify that long word numbers are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 777777777777777;
    let wordNum1: string = 'seven hundred seventy seven trillion, seven hundred seventy seven billion, seven hundred seventy seven million, seven hundred seventy seven thousand, seven hundred seventy seven';
    let num2: number = 1;
    let wordNum2: string = 'one';
    let answer: number = num1 + num2;
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of ${wordNum1} and ${wordNum2} should display.`).toHaveText(answer.toString());
  });

  test('TC32: Verify that numbers with leading/trailing whitespaces are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 12;
    let wordNum1: string = '           12  ';
    let num2: number = 1;
    let wordNum2: string = '           1  ';
    let answer: number = num1 + num2;
    // first input field has leading/trailing whitespaces
    await calPage.compute(wordNum1, num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
    // second input field has leading/trailing whitespaces
    await calPage.compute(num1.toString(), wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
    // both input fields have leading/trailing whitespaces
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
  });

  test('TC33: Verify that numbers with leading/trailing whitespaces are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 320;
    let wordNum1: string = '00000320';
    let num2: number = 30;
    let wordNum2: string = '0000030';
    let answer: number = num1 + num2;
    // first input field has leading/trailing whitespaces
    await calPage.compute(wordNum1, num2.toString(), calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
    // second input field has leading/trailing whitespaces
    await calPage.compute(num1.toString(), wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
    // both input fields have leading/trailing whitespaces
    await calPage.compute(wordNum1, wordNum2, calData.func.plus);
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${wordNum1}' and ${num2} should display.`).toHaveText(answer.toString());
  });

  test('TC34: Verify that numbers with leading/trailing whitespaces are correctly computed', async ({ page }) => {
    const calPage = new CalculatorPage(page);
    let num1: number = 1234;
    let num2: number = 5678;
    let answer: number = num1 + num2;
    await calPage.compute(num1.toString(), num2.toString(), calData.func.plus);
    for (let ctr = 0; ctr < 100; ctr++) {
      await calPage.calcBtn.dblclick();
    }
    await expect(calPage.answerLabel, `Answer label should be displayed.`).toBeVisible();
    await expect(calPage.answerVal, `Sum of '${num1}' and ${num2} should display.`).toHaveText(answer.toString());
  });

  test.afterEach(async ({page}) => {
    await page.close();
  });
});

