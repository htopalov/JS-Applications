const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');
let browser, page;

describe('Test for Problem 1-Accordion functionality according to specification', function () {
    this.timeout(6000);
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }); }); //headless false and slowMo added just for fun
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('check if loads titles correctly', async () => {
        await page.goto('http://localhost:3000');
        let content = await page.content();
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
    });
    it('check if clicking buttons makes textContent "Less"', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.button');
        let buttonText = await page.textContent('.accordion .head .button');
        assert.equal(buttonText, 'Less');
    });
    it('check if content is correct when click more', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.button');
        let content = await page.textContent('.accordion .extra p');
        let expectedContent = `Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.`;
        assert.equal(content,expectedContent);
    });
    it('check if button text content becomes More after second click', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.button');
        await page.click('.button');
        let buttonText = await page.textContent('.accordion .head .button');
        assert.equal(buttonText, 'More');
    });
    it('check if text content is missing after second click(div display-none)', async () => {
        await page.goto('http://localhost:3000');
        await page.click('.button');
        await page.click('.button');
        let visible = await page.isVisible('.extra');
        assert.equal(visible,false);
    });
    
});
