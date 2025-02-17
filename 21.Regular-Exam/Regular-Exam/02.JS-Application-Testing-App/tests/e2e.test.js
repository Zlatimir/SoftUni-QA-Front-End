const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000';

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let bookTitle = "";

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
        test("Registration with Valid Data", async() => {
            await page.goto(host);
            await page.click("//a[@href='/register']");
            await page.waitForSelector("//form");
            let random = Math.floor(Math.random() * 1000);
            user.email = "user_" + random + "@gmail.com";
            await page.fill("//input[@name='email']", user.email);
            await page.fill("//input[@name='password']", user.password);
            await page.fill("//input[@name='conf-pass']", user.confirmPass);
            await page.click("//button[text()='Register']");

            await expect(page.locator("//a[@href='/logout']")).toBeVisible();
            expect(page.url()).toBe(host + "/");
        });

        test("Login with Valid Data", async() => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']", user.email);
            await page.fill("//input[@name='password']", user.password);
            await page.click("//button[@type='submit']");

            await expect(page.locator("//a[@href='/logout']")).toBeVisible();
            expect(page.url()).toBe(host + "/");
        });

        test("Logout from the Application", async() => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']", user.email);
            await page.fill("//input[@name='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.click("//a[@href='/logout']");
            await page.waitForSelector("//a[@href='/login']");

            expect(page.url()).toBe(host + "/");
        });
    });

    describe("navbar", () => {
        test("Navigation for Logged-In User", async() => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']", user.email);
            await page.fill("//input[@name='password']", user.password);
            await page.click("//button[@type='submit']");
            await page.waitForSelector("//a[@href='/logout']");

            await expect(page.locator("//a[text()='Home']")).toBeVisible();
            await expect(page.locator("//a[text()='Collection']")).toBeVisible();
            await expect(page.locator("//a[text()='Search']")).toBeVisible();
            await expect(page.locator("//a[text()='Create Book']")).toBeVisible();
            await expect(page.locator("//a[text()='Logout']")).toBeVisible();

            await expect(page.locator("//a[text()='Login']")).toBeHidden();
            await expect(page.locator("//a[text()='Register']")).toBeHidden();
        });

        test("Navigation for Guest User", async() => {
            await page.goto(host);

            await expect(page.locator("//a[text()='Home']")).toBeVisible();
            await expect(page.locator("//a[text()='Collection']")).toBeVisible();
            await expect(page.locator("//a[text()='Search']")).toBeVisible();   
            await expect(page.locator("//a[text()='Login']")).toBeVisible();
            await expect(page.locator("//a[text()='Register']")).toBeVisible();

            await expect(page.locator("//a[text()='Create Book']")).toBeHidden();
            await expect(page.locator("//a[text()='Logout']")).toBeHidden();
        });
    });

    describe("CRUD", () => {
        beforeEach(async() => {
            await page.goto(host);
            await page.click("//a[@href='/login']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='email']", user.email);
            await page.fill("//input[@name='password']", user.password);
            await page.click("//button[@type='submit']");
        });

        test("Create a Book", async() => {
            await page.click("//a[text()='Create Book']");
            await page.waitForSelector("//form");
            let random = Math.floor(Math.random() * 10000);
            bookTitle = "Book-" + random;
            await page.fill("//input[@id='title']", bookTitle);
            await page.fill("//input[@id='coverImage']", "SomeImage");
            await page.fill("//input[@id='year']", "2000");
            await page.fill("//input[@id='author']", "SomeAuthor");
            await page.fill("//input[@id='genre']", "SomeGenre");
            await page.fill("//textarea[@name='description']", "Some Very Long Description");
            await page.click("//button[@type='submit']");

            await expect(page.locator("//div[@class='book']//h2", {hasText: bookTitle})).toHaveCount(1);
            expect(page.url()).toBe(host + "/collection");
        });

        test("Edit a Book", async() => {
            await page.click("//a[@href='/search']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='search']", bookTitle);
            await page.click("//button[@type='submit']");
            await page.click(`//a[text()='${bookTitle}']`);
            await page.click("//a[text()='Edit']");
            await page.waitForSelector("//form");
            bookTitle = bookTitle + "-edited";
            await page.fill("//input[@id='title']", bookTitle);
            await page.click("//button[text()='Save Changes']");

            await expect(page.locator("//div[@class='book-info']//h2", {hasText: bookTitle})).toHaveCount(1);
        });

        test("Delete a Book", async() => {
            await page.click("//a[@href='/search']");
            await page.waitForSelector("//form");
            await page.fill("//input[@name='search']", bookTitle);
            await page.click("//button[@type='submit']");
            await page.click(`//a[text()='${bookTitle}']`);
            await page.click("//a[text()='Delete']");

            await expect(page.locator("//div[@class='book-info']//h2", {hasText: bookTitle})).toHaveCount(0);
            expect(page.url()).toBe(host + "/collection");
        });
    });
});