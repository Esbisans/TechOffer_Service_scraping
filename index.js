const browserObject = require('./browser');
const scraperController = require('./pageController');

const browserInstance = browserObject.startBrowser();

//scraperController(browserInstance)

const data = scraperController.scrapeAll(browserInstance, 'laptop lenovo')

data.then(val => console.log(val))
