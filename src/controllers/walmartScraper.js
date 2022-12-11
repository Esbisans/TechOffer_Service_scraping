const scraperWalmart = {
    url: 'https://www.liverpool.com.mx/tienda/home',
    async scraper(browser, searchString){
        const page = await browser.newPage();
        await page.setDefaultTimeout(60000);
        console.log(`Navigating to ${this.url}...`);


        try {
            page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
            await page.setViewport({ width: 1366, height: 768});
            await page.goto(this.url);
            console.log(`wait for searchbarinput`);
            await page.screenshot({
                path: 'public/img/screenshot.jpg',
            });
            console.log(`sreenshot tomada`);
            await page.waitForSelector('#mainSearchbar');
            //await page.waitForNavigation();
            await page.type('#mainSearchbar', searchString);
            await page.keyboard.press('Enter');
            console.log(`Searching to ${searchString}...`);
            //await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0});
            await page.waitForSelector('.m-product__card > a');

            await page.click('.m-product__card > a');
            console.log(`navigating to .m-product__card`);
            //await page.waitForSelector('.product-details_productDetails__Uunoq');
            await page.waitForNavigation();
            
            let dataObj = {};
            
            dataObj['store'] = 'Liverpool';
            dataObj['url'] = await page.$eval('link[rel="canonical"]', link => link.href);
            dataObj['name'] = await page.$eval('h1.a-product__information--title', text => text.textContent);
            dataObj['price'] = (await page.$eval('p.a-product__paragraphDiscountPrice', text => text.textContent));
            dataObj['image'] = await page.$eval('.m-img-pdp', img => img.src);


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