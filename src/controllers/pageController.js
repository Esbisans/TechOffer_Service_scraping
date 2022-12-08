const pageScraper = require('../controllers/pageScraper');

async function scrapeAll(browserInstance, searchString){
	let browser;
    let json;
	try{
		browser = await browserInstance;

		let dataScraped = {}

        const scrapedDataAmazon = await pageScraper.scraper(browser, searchString);	

		//const scrapedDataMercado = await scraperMercadoLibre.scraper(browser, searchString);
		
		//dataScraped['mercado'] = scrapedDataMercado;
		//dataScraped['amazon'] = scrapedDataAmazon;

		//await pageScraper.scraper(browser);	
        await browser.close();

		console.log(scrapedDataAmazon);
		json = JSON.stringify(scrapedDataAmazon);

        //console.log(scrapedDataMercado);
        //json = JSON.stringify(scrapedDataMercado);
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