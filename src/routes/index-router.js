const express = require("express");
const router = express.Router();

router.get("/" , (req, res) => {
    res.send('conecction to app scraping v1.3');
})

module.exports = router

