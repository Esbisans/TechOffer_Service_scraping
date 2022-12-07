const express = require("express");
const browserObject = require('./browser');
const scraperController = require('./pageController');

//const scraper = require('./scrapering');

const cors = require('cors');
const { json } = require("express");
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/" ,async (req, res) => {
    res.send('Scraping to amazon');
    /*
    const mediumData = new Promise((resolve, reject) => {
        scraper.scrapeMedium().then(data => {
            resolve(data)
        }).catch(err => reject('Medium scrape failed error fall ', err))
    })  
    
    Promise.all([mediumData]).then(data => {
        res.send(data)
        console.log(data)
    }).catch(err => res.status(500).send(err))
    */
})

app.get("/:string" , async (req, res) => {

    //try{
        const searchString = req.params.string;
        const browserInstance = await browserObject.startBrowser();
        const response = await scraperController.scrapeAll(browserInstance, searchString)
        console.log("respuesta: ", response)
        res.json(JSON.parse(response))
    //}catch(error){
    //    res.send(error)
    //}

})


app.listen(PORT, () => {
    console.log("servicio corriendo en puerto: ", PORT)
} )

