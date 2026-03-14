const apartmentService = require('../services/apartmentService');

class ApiController {
    async getAllApartments(req, res) {
        try {
            const apartments = await apartmentService.getAllApartments();
            res.json(apartments);
        } catch (error) {
            res.status(500).json({
                message: 'Помилка при отриманні списку квартир'
            });
        }
    }

    async getApartmentById(req, res) {
        try {
            const apartment = await apartmentService.getApartmentById(req.params.id);

            if (!apartment) {
                return res.status(404).json({
                    message: 'Квартиру не знайдено'
                });
            }

            res.json(apartment);
        } catch (error) {
            res.status(500).json({
                message: 'Помилка при отриманні квартири'
            });
        }
    }
}

module.exports = new ApiController();