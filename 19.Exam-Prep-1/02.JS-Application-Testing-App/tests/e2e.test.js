const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPass: "123456",
};

let albumName = "";

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    describe("authentication", () => {

        test('Registration with Valid Data', async () => {
            let random = Math.floor(Math.random() * 1000);
            user.email = `test-${random}@abv.bg`;
            await page.goto(host);
            await page.click("//a[@href='/register']");
            await page.locator("//form");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.fill("//input[@id='conf-pass']", user.confirmPass);
            await page.click("//button[@type='submit']");

            await expect(page.locator("//a[@href='/logout']")).toBeVisible();
            expect(page.url()).toBe(host + '/');
        });

        test('Login with Valid Data', async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");

            await expect(page.locator("//a[@href='/logout']")).toBeVisible();
            expect(page.url()).toBe(host + '/');
        });

        test('Logout from the Application', async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[@href='/logout']");
    
            await expect(page.locator("//a[@href='/login']")).toBeVisible();
            expect(page.url()).toBe(host + '/');
        });
    });
    
    describe("navbar", () => {

        test('Navigation for Logged-In User', async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");
    
            await expect(page.locator("//a[text()='Home']")).toBeVisible();
            await expect(page.locator("//a[text()='Catalog']")).toBeVisible();
            await expect(page.locator("//a[text()='Search']")).toBeVisible();
            await expect(page.locator("//a[text()='Create Album']")).toBeVisible();
            await expect(page.locator("//a[text()='Logout']")).toBeVisible();
            await expect(page.locator("//a[text()='Login']")).toBeHidden();
            await expect(page.locator("//a[text()='Register']")).toBeHidden();
        });

        test('Navigation for Guest User', async () => {
            await page.goto(host);
    
            await expect(page.locator("//a[text()='Home']")).toBeVisible();
            await expect(page.locator("//a[text()='Catalog']")).toBeVisible();
            await expect(page.locator("//a[text()='Search']")).toBeVisible();
            await expect(page.locator("//a[text()='Create Album']")).toBeHidden();
            await expect(page.locator("//a[text()='Logout']")).toBeHidden();
            await expect(page.locator("//a[text()='Login']")).toBeVisible();
            await expect(page.locator("//a[text()='Register']")).toBeVisible();
        });
    });

    describe("CRUD", () => {

        test ('Create an Album', async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[text()='Create Album']");
            await page.locator("//form");
            let random = Math.floor(Math.random() * 1000);
            albumName = `Album-${random}`;
            await page.fill("//input[@id='name']", albumName);
            await page.fill("//input[@id='imgUrl']", "https://i.scdn.co/image/ab6761610000517432845b1556f9dbdfe8ee6575");
            await page.fill("//input[@id='price']", "9.99");
            await page.fill("//input[@id='releaseDate']", "15-Oct-1967");
            await page.fill("//input[@id='artist']", "Rammstein");
            await page.fill("//input[@id='genre']", "Neue Deutsche Härte");
            await page.fill("//textarea", "Some description here");
            await page.click("//button[@type='submit']");

            await expect(page.locator(`//p[text()='${albumName}']`)).toBeVisible();
            await expect(page.url()).toBe(host + "/catalog");
        });

        test ("Edit an Album", async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[@href='/search']");
            await page.locator("//input[@id='search-input']");
            await page.fill("//input[@id='search-input']", albumName);
            await page.click("//button[text()='Search']");
            await page.click("//a[@id='details']");
            await page.click("//a[text()='Edit']");
            await page.locator("//form");
            await page.fill("//input[@id='name']", `${albumName}-edited`);
            await page.click("//button[@type='submit']");
            albumName = `${albumName}-edited`;
            await expect(page.locator("//div//h1")).toHaveText(`Name: ${albumName}`);
        });

        test("Delete an Album", async () => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.locator("//button[text()='Login']");
            await page.fill("//input[@id='email']", user.email);
            await page.fill("//input[@id='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[@href='/search']");
            await page.locator("//input[@id='search-input']");
            await page.fill("//input[@id='search-input']", albumName);
            await page.click("//button[text()='Search']");
            await page.click("//a[@id='details']");
            await page.click("//a[@class='remove']");

            await expect(page.locator("//p[@class='name']", { hasText: albumName })).toHaveCount(0);
            await expect(page.url()).toBe(host + "/catalog");
        });
    });
});