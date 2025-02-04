const { test, expect } = require('@playwright/test');
const host = 'http://localhost:3000';
const userEmail = 'peter@abv.bg';
const userPassword = '123456';

test.describe('Navbar Links Visibility for non-logged user', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(host);
        await page.waitForSelector('nav.navbar');
    });

    test('Verify "All books" link is visible', async ({ page }) => {
        const allBooksLink = await page.$('nav.navbar a[href="/catalog"]');
        const isLinkVisible = await allBooksLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify "Login" button is visible', async ({ page }) => {
        const loginLink = await page.$('nav.navbar a[href="/login"]');
        const isLinkVisible = await loginLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify "Register" button is visible', async ({ page }) => {
        const registerLink = await page.$('nav.navbar a[href="/register"]');
        const isLinkVisible = await registerLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });
});

test.describe('Navbar Links Visibility for logged user', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(host + '/login');
        await page.fill('input[name="email"]', userEmail);
        await page.fill('input[name="password"]', userPassword);
        await page.click('input[type="submit"]');
    });

    test.afterEach(async ({ page }) => {
        await page.click('a[href="javascript:void(0)"]');
    });

    test('Verify "All books" link is visible', async ({ page }) => {
        const allBooksLink = await page.locator('a[href="/catalog"]');
        const isLinkVisible = await allBooksLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify "Logout" button is visible', async ({ page }) => {
        const logoutLink = await page.$('a[href="javascript:void(0)"]');
        const isLinkVisible = await logoutLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify "My books" link is visible', async ({ page }) => {
        const myBooksLink = await page.$('a[href="/profile"]');
        const isLinkVisible = await myBooksLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify "Add book" link is visible', async ({ page }) => {
        const myBooksLink = await page.$('a[href="/create"]');
        const isLinkVisible = await myBooksLink.isVisible();
        expect(isLinkVisible).toBe(true);
    });

    test('Verify User email is visible', async ({ page }) => {
        const welcomeSpan = await page.$('div#user span');
        const textContent = await welcomeSpan.textContent();
        expect(textContent).toContain('peter@abv.bg');
    });
});

test.describe('Login page', () => {
    test('Log in with Valid Credentials', async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.fill("//input[@id='email']", userEmail);
        await page.fill("//input[@id='password']", userPassword);
        await page.click("//input[@type='submit']");
        await page.waitForSelector("//div[@id='user']");
        expect(page.url()).toBe('http://localhost:3000/catalog');
    });

    test('Submit the Form with Empty Input Fields', async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        await page.click("//input[@type='submit']");
        page.on('dialog', async dialog => {
            expect(dialog.type().toContain('alert'));            
            expect(dialog.message()).toContain('555 All fields are required!');
            await dialog.accept();
        });
        await page.waitForSelector("//a[@href='/login']");
        expect(page.url()).toBe('http://localhost:3000/login');
    });
});