const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/apartments', apiController.getAllApartments);

router.get('/apartments/:id', apiController.getApartmentById);

module.exports = router;