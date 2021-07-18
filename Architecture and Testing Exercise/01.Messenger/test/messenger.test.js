const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

let browser, page;

function fakeResponse(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
}

let mockData = {
    xxx: {
        author: 'Author',
        content: 'Test msg'
    },
    yyy: {
        author: 'FAKE',
        content: 'Fake message'
    }
}

describe('Test for messenger app', function () {
    this.timeout(5000);
    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 1000 });
    });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('should call server', async () => {
        await page.route('**/jsonstore/messenger', route => {
            route.fulfill(fakeResponse(mockData))
        });

        await page.goto('http://127.0.0.1:5500');

        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('#refresh')
        ]);
        let result = await response.json();
        assert.deepEqual(result,mockData);
    });

    it('should show data in text area', async () => {
        await page.route('**/jsonstore/messenger', route => {
            route.fulfill(fakeResponse(mockData))
        });

        await page.goto('http://127.0.0.1:5500');

        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('#refresh')
        ]);

        let textAreaText = await page.$eval('#messages', (textArea) => textArea.value);

        let text = Object.values(mockData).map(v => `${v.author}: ${v.content}`).join('\n');
        assert.equal(textAreaText,text);
    });
});