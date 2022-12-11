const express = require('express');
const indexRouter = require('./src/routes/index-router');
const amazonRouter = require('./src/routes/amazon-router');
const mercadoRouter = require('./src/routes/mercado-router');
const walmartRouter = require('./src/routes/walmarth-router')
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

/*
app.get("/" ,async (req, res) => {
    res.send('Scraping to amazon v1.2');
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
    /
})

app.get("/:string" , async (req, res) => {


        const searchString = req.params.string;
        const browserInstance = await browserObject.startBrowser();

        const response = await scraperController.scrapeAll(browserInstance, searchString)

        console.log("respuesta: ", response)
        res.json(JSON.parse(response))

})

*/
//////////////7
app.use('/', indexRouter);
app.use('/amazon', amazonRouter);
app.use('/mercado', mercadoRouter);
app.use('/walmart', walmartRouter);

app.listen(PORT, () => {
    console.log("servicio corriendo en puerto: ", PORT);
} )

