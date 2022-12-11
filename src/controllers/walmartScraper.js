const scraperWalmart = {
    url: 'https://www.walmart.com.mx/',
    async scraper(browser, searchString){
        const page = await browser.newPage();
        await page.setDefaultTimeout(60000);
        console.log(`Navigating to ${this.url}...`);


        try {
            await page.goto(this.url);
            console.log(`wait for searchbarinput`);
            //await page.waitForSelector('input[data-automation-id="search-bar"]');
            await page.waitForNavigation();
            await page.type('input[data-automation-id="search-bar"]', searchString);
            await page.keyboard.press('Enter');
            console.log(`Searching to ${searchString}...`);
            //await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});
            await page.waitForSelector('.product_productCardSummary___YXeD > a');

            await page.click('.product_productCardSummary___YXeD > a');
            console.log(`navigating to .product_productCardSummary___YXeD`);
            await page.waitForSelector('.product-details_productDetails__Uunoq');
            //await page.waitForNavigation();
            
            let dataObj = {};
            
            dataObj['store'] = 'Walmart';
            dataObj['url'] = await page.$eval('link[rel="canonical"]', link => link.href);
            dataObj['name'] = await page.$eval('h1[data-automation-id="product-details-header"]', text => text.textContent);
            dataObj['price'] = await page.$eval('h4[data-automation-id="product-price"]', text => text.textContent);
            dataObj['image'] = await page.$eval('.image-picker_mainImageContainer__g8rrD > img', img => img.src);


            await page.close();

            return dataObj;
            
        } catch (error) {
            let errorObj ={}
            errorObj['status'] = false;
            errorObj['title'] = 'Error on navigation';
            errorObj['error'] = error;
            return errorObj
        }


    }
}

module.exports = scraperWalmart;