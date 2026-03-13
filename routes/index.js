const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/',                  weatherController.index);
router.get('/weather/',          weatherController.weather);
router.get('/weather/search',    weatherController.search);
router.get('/weather/:city',     weatherController.getCity);

module.exports = router;
