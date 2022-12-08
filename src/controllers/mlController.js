const mlScraper = require('../controllers/mlScraper');

async function scrapeAll(browserInstance, searchString){
	let browser;
    let json;
	try{
		browser = await browserInstance;

		const scrapedDataMercado = await mlScraper.scraper(browser, searchString);

        await browser.close();

		console.log(scrapedDataMercado);
		json = JSON.stringify(scrapedDataMercado);

	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}

    return json;	
}

module.exports = {
	scrapeAll
};