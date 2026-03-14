const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/new', apartmentController.renderCreateForm);

router.post('/', apartmentController.createApartment);

router.get('/:id', apartmentController.renderApartmentDetails);

router.get('/:id/edit', apartmentController.renderEditForm);

router.put('/:id', apartmentController.updateApartment);

router.delete('/:id', apartmentController.deleteApartment);

module.exports = router;