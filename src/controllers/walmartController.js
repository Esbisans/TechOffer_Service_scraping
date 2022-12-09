const walmartScraper = require('../controllers/walmartScraper');

async function scrapeAll(browserInstance, searchString){
	let browser;
    let json;
	try{
		browser = await browserInstance;

		const scrapedDataWalmart = await walmartScraper.scraper(browser, searchString);

        await browser.close();

		console.log(scrapedDataWalmart);
		json = JSON.stringify(scrapedDataWalmart);

	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}

    return json;	
}

module.exports = {
	scrapeAll
};