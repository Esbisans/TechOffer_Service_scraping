const scraperObject = {
	url: 'https://www.amazon.com.mx/',
	async scraper(browser, searchString){
		const page = await browser.newPage();
        await page.setDefaultTimeout(60000);
		console.log(`Navigating to ${this.url}...`);

        try {
            //await page.goto(this.url, {waitUntil: 'networkidle2', timeout: 0});
            await page.setViewport({ width: 1366, height: 768});
            await page.goto(this.url, {waitUntil: 'domcontentloaded'});


            while (await page.$('#nav-bb-searchbar')){
                console.log('pagina deprecada')
                await page.reload();
            }
            console.log(`wait for nav-input nav-progressive-attribute`);
            //await page.waitForSelector('#twotabsearchtextbox', {waitUntil: 'networkidle0', timeout: 0});
            console.log(await page.content());
            await page.type('.nav-input.nav-progressive-attribute', searchString);
            await page.keyboard.press('Enter');
            console.log(`Searching to ${searchString}...`);
            await page.waitForNavigation();
            await page.click('.a-section > .s-image');
            console.log(`navigating to .a-section.a-spacing-base`);
            await page.waitForNavigation();

            
            let dataObj = {};
            //dataObj['name'] = await page.$eval('.centerColAlign > .celwidget > .a-section > h1 > span', text => text.textContent);
            dataObj['status'] = true;
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
            //await browser.close();

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

module.exports = scraperObject;