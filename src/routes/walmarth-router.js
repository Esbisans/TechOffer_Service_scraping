const express = require('express');
const router = express.Router();

const browserObject = require('../controllers/browser');
const scraperController = require('../controllers/walmartController');

router.get("/:string" , async (req, res) => {


    const searchString = req.params.string;
    const browserInstance = await browserObject.startBrowser();

    const response = await scraperController.scrapeAll(browserInstance, searchString)

    console.log("respuesta: ", response)
    res.json(JSON.parse(response))

})

module.exports = router;