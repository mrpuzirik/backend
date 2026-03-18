const apartmentService = require('../services/apartmentService');

module.exports = {
    getAllApartments: async () => {
        return apartmentService.getAllApartments();
    },

    getApartmentById: async ({ id }) => {
        return apartmentService.getApartmentById(id);
    },

    createApartment: async ({ input }) => {
        return apartmentService.createApartmentFromGraphQL(input);
    },
    updateApartment: async ({ id, input }) => {
        return apartmentService.updateApartmentFromGraphQL(id, input);
    },

    deleteApartment: async ({ id }) => {
        await apartmentService.deleteApartment(id);
        return `Квартиру з id ${id} успішно видалено`;
    }
};