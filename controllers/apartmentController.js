const apartmentService = require('../services/apartmentService');

class ApartmentController {
    async renderHomePage(req, res) {
        try {
            const apartments = await apartmentService.getAllApartments();

            res.render('index', {
                title: 'Квартири для продажу',
                apartments
            });
        } catch (error) {
            res.status(500).send('Помилка при отриманні списку квартир');
        }
    }

    renderCreateForm(req, res) {
        res.render('add', {
            title: 'Додати квартиру'
        });
    }

    async createApartment(req, res) {
        try {
            await apartmentService.createApartment(req.body);
            res.redirect('/');
        } catch (error) {
            res.status(400).send('Помилка при додаванні квартири: ' + error.message);
        }
    }

    async renderApartmentDetails(req, res) {
        try {
            const apartment = await apartmentService.getApartmentById(req.params.id);

            if (!apartment) {
                return res.status(404).send('Квартиру не знайдено');
            }

            res.render('show', {
                title: 'Інформація про квартиру',
                apartment
            });
        } catch (error) {
            res.status(500).send('Помилка при отриманні квартири');
        }
    }

    async renderEditForm(req, res) {
        try {
            const apartment = await apartmentService.getApartmentById(req.params.id);

            if (!apartment) {
                return res.status(404).send('Квартиру не знайдено');
            }

            res.render('edit', {
                title: 'Редагувати квартиру',
                apartment
            });
        } catch (error) {
            res.status(500).send('Помилка при відкритті форми редагування');
        }
    }

    async updateApartment(req, res) {
        try {
            const updatedApartment = await apartmentService.updateApartment(req.params.id, req.body);

            if (!updatedApartment) {
                return res.status(404).send('Квартиру не знайдено');
            }

            res.redirect('/');
        } catch (error) {
            res.status(400).send('Помилка при оновленні квартири: ' + error.message);
        }
    }

    async deleteApartment(req, res) {
        try {
            const deletedApartment = await apartmentService.deleteApartment(req.params.id);

            if (!deletedApartment) {
                return res.status(404).send('Квартиру не знайдено');
            }

            res.redirect('/');
        } catch (error) {
            res.status(500).send('Помилка при видаленні квартири');
        }
    }
}

module.exports = new ApartmentController();