const { chromium } = require('playwright-chromium');
const { assert } = require('chai');
let browser, page;

describe('Test for Problem 2-Cookbook functionality according to specification', function () {
    this.timeout(6000);
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 100 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });
    it('check if welcome message is visible', async ()=>{
        await page.goto('http://localhost:3000');
        let welcomeContent = await page.textContent('h2');
        assert.equal(welcomeContent, 'Welcome to My Cookbook');
    });
    it('check if recently added recipes div textContent is visible', async ()=>{
        await page.goto('http://localhost:3000');
        let recentlyAddedContent = await page.textContent('#home header');
        assert.equal(recentlyAddedContent, 'Recently added recipes');
    });
    it('check if recipes container is visible', async ()=>{
        await page.goto('http://localhost:3000');
        let isVisible = await page.isVisible('.recent-recipes');
        assert.equal(isVisible,true);
    });
    it('check if 3 recipes are loaded', async ()=>{
        await page.goto('http://localhost:3000');
        let recipeCount = await page.$$('.recent')
        assert.equal(recipeCount.length,3);
    });
    it('check first recipe', async ()=>{
        await page.goto('http://localhost:3000');
        let firstRecipeText = await page.textContent('.recent');
        assert.equal(firstRecipeText, 'Roast Trout');
    });
    it('check if clicking on My cookbook anchor gets user back to home view', async ()=>{
        await page.goto('http://localhost:3000');
        await page.click('header h1 a');
        let sectionTitle = await page.textContent('.section-title');
        assert.equal(sectionTitle,'Recently added recipes');
    });
    it('check if there is 5 recipes on first page', async ()=>{
        await page.goto('http://localhost:3000');
        await page.click('#catalogLink');
        let recipePreviewCount = await page.$$('.preview');
        assert.equal(recipePreviewCount.length,5);
        //not using mocking so test will fail if not supplied with fake data
    });
    it('check if catalog pagination is visible', async ()=>{
        await page.goto('http://localhost:3000');
        await page.click('#catalogLink');
        let text = await page.textContent('.section-title');
        assert.equal(text,'Page 1 of 1');
    });
});