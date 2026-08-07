import { type Page, type Locator } from '@playwright/test';

export class CalculatorPage {
    private readonly page: Page;
    public readonly num1: Locator;
    public readonly num2: Locator;
    public readonly func: Locator;
    public readonly calcBtn: Locator;
    public readonly answerLabel: Locator;
    public readonly answerVal: Locator;

    //selectors
    constructor(page: Page) {
        this.page = page;
        this.num1 = page.locator(`input#number1`);
        this.num2 = page.locator(`input#number1`);
        this.func = page.locator(`select#function`);
        this.calcBtn = page.locator(`button#calculate`);
        this.answerLabel = page.locator(`div.centered > div > p`);
        this.answerVal = page.locator(`span#answer`);
    }

    //methods
}