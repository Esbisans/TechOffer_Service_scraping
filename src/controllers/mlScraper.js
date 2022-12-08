const scraperMl = {
    url: 'https://www.mercadolibre.com.mx/',
    async scraper(browser, searchString){
        const page = await browser.newPage();
        await page.setDefaultTimeout(60000);
        console.log(`Navigating to ${this.url}...`);


        try {
            await page.goto(this.url);
            console.log(`wait for .nav-search-input`);
            //await page.waitForSelector('.nav-input');
            await page.type('.nav-search-input', searchString);
            await page.keyboard.press('Enter');
            console.log(`Searching to ${searchString}...`);
            await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});

            await page.click('.andes-card');
            console.log(`navigating to .andes-card`);
            await page.waitForSelector('.ui-pdp');
            
            let dataObj = {};
            
            dataObj['store'] = 'Mercado Libre';
            dataObj['url'] = await page.$eval('link[rel="canonical"]', link => link.href);
            dataObj['name'] = await page.$eval('.ui-pdp-title', text => text.textContent);
            dataObj['price'] = await page.$eval('.andes-money-amount__fraction', text => text.textContent);
            dataObj['image'] = await page.$eval('figure > img', img => img.src);


            await page.close();

            return dataObj;
            
        } catch (error) {
            let errorObj ={}
            errorObj['title'] = 'Error on navigation';
            errorObj['error'] = error;
            return errorObj
        }


    }
}

module.exports = scraperMl;