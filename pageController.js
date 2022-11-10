const pageScraper = require('./pageScraper');

async function scrapeAll(browserInstance, searchString){
	let browser;
    let json;
	try{
		browser = await browserInstance;
        const scrapedData = await pageScraper.scraper(browser, searchString);	
		//await pageScraper.scraper(browser);	
        await browser.close();
        console.log(scrapedData);
        json = JSON.stringify(scrapedData);
        //console.log(json)	
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}

    return json;	
}

//module.exports = (browserInstance) => scrapeAll(browserInstance)

module.exports = {
	scrapeAll
};