const scraperObject = {
	url: 'https://www.amazon.com.mx/',
	async scraper(browser, searchString){
		const page = await browser.newPage();
        await page.setDefaultTimeout(90000);
		console.log(`Navigating to ${this.url}...`);

        try {
            await page.goto(this.url);
            console.log(`wait for .nav-input`);
            await page.waitForSelector('.nav-input');
            await page.type('.nav-input', searchString);
            await page.keyboard.press('Enter');
            console.log(`Searching to ${searchString}...`);
            await page.waitForNavigation();
            //await page.waitForSelector('.s-card-container');
            await page.click('.a-section.a-spacing-base');
            await page.waitForNavigation();
    
            let dataObj = {};
            //dataObj['name'] = await page.$eval('.centerColAlign > .celwidget > .a-section > h1 > span', text => text.textContent);
            dataObj['store'] = 'Amazon';
            dataObj['url'] = await page.$eval('link[rel="canonical"]', link => link.href);
            dataObj['name'] = await page.$eval('#productTitle', text => text.textContent);
            dataObj['price'] = await page.$eval('.a-section > .a-price > .a-offscreen', text => text.textContent);
            dataObj['image'] = await page.$eval('#landingImage', img => img.src);

            
            /*    
            let dataObj = {};
            dataObj['name'] = await page.$eval('.s-card-container > .a-section > .a-section > .a-section > h2 > a > span', text => text.textContent);
            dataObj['price'] = await page.$eval('.s-card-container > .a-section > .a-section > .a-section > .a-row > a > .a-price > .a-offscreen', text => text.textContent);
            //console.log(dataObj);
    */        
            await page.close();
            await browser.close();

            return dataObj;
            
        } catch (error) {
            let errorObj ={}
            errorObj['title'] = 'Error on navigation';
            errorObj['error'] = error;
            return errorObj
        }


	}
}

module.exports = scraperObject;