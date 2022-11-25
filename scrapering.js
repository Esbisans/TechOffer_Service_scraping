const puppeteer = require('puppeteer');

const scrapeMedium = async () => {
    console.log("inicializando......");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
    });
    console.log("Opening the browser......");
    const page = await browser.newPage()
    await page.goto('https://www.amazon.com.mx/')

    await page.waitForSelector('.nav-input');
    await page.type('.nav-input', 'laptop acer');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.s-card-container');

    let scrapeData = {};

    scrapeData['name'] = await page.$eval('.s-card-container > .a-section > .a-section > .a-section > h2 > a > span', text => text.textContent);
        //console.log(dataObj);

    await browser.close();
	return scrapeData;

}

module.exports.scrapeMedium = scrapeMedium