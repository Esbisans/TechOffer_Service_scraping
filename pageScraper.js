const scraperObject = {
	url: 'https://www.amazon.com.mx/',
	async scraper(browser, searchString){
		const page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
        await page.setDefaultTimeout(90000);
		await page.goto(this.url);
        await page.waitForSelector('.nav-input');
        await page.type('.nav-input', searchString);
        await page.keyboard.press('Enter');
        await page.waitForSelector('.s-card-container');

        let dataObj = {};
        dataObj['name'] = await page.$eval('.s-card-container > .a-section > .a-section > .a-section > h2 > a > span', text => text.textContent);
        //console.log(dataObj);

		return dataObj;
	}
}

module.exports = scraperObject;