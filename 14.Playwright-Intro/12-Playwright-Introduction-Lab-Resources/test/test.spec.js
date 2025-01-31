const {test, expect} = require('@playwright/test');

test ('User can add a task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    const text = await page.textContent('.task');
    expect(text).toContain('Buy milk');    
});

test ('User can delete a task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.click('.task .delete-task');
    const text = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));    
    expect(text.length).toBe(0);    
});

test ('User can complete a task', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.click('.task .task-complete');
    const text = await page.getAttribute('.task', 'class');
    expect(text).toContain('completed');    
});

test ('User can filter tasks', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Buy milk');
    await page.click('#add-task');
    await page.fill('#task-input', 'Buy eggs');
    await page.click('#add-task');
    await page.click('.task:nth-child(1) .task-complete');
    await page.selectOption('#filter', 'Completed');
    const text = await page.$$eval('.task.completed', tasks => tasks.map(task => task.childNodes[0].textContent.trim()));    
    expect(text).toContain('Buy milk');
    const task = await page.$('.task.completed');
    expect(task).not.toBeNull();
    expect(text).not.toContain('Buy eggs');    
});