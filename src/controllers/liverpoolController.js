const liverpoolScraper = require('./liverpoolScraper');

async function scrapeAll(browserInstance, searchString){
	let browser;
    let json;
	try{
		browser = await browserInstance;

		const scrapedDataLiverpool = await liverpoolScraper.scraper(browser, searchString);

        await browser.close();

		console.log(scrapedDataLiverpool);
		json = JSON.stringify(scrapedDataLiverpool);

	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}

    return json;	
}

module.exports = {
	scrapeAll
};