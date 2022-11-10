const express = require("express");
const browserObject = require('./browser');
const scraperController = require('./pageController');
const cors = require('cors')

const PORT = process.env.PORT || 3003;
const app = express();

app.use(cors());

app.get("/" ,async (req, res) => {

    //const browserInstance = await browserObject.startBrowser();
    //const response = await scraperController.scrapeAll(browserInstance, 'laptop acer')

    //console.log("response: ", response)
    res.send('Scraping to amazon');
})

app.get("/:string" , async (req, res) => {

    const searchString = req.params.string;

    const browserInstance = await browserObject.startBrowser();
    const response = await scraperController.scrapeAll(browserInstance, searchString)

    console.log("response: ", response)
    res.json(response)
})


app.listen(3003, () => {
    console.log("servicio corriendo en puerto: ", PORT)
} )

