const apartmentRepository = require('../repositories/apartmentRepository');

class ApartmentService {
    async getAllApartments() {
        return apartmentRepository.findAll();
    }

    async getApartmentById(id) {
        return apartmentRepository.findById(id);
    }

    async createApartment(formData) {
        const apartmentData = this.mapFormDataToApartment(formData);
        return apartmentRepository.create(apartmentData);
    }

    async updateApartment(id, formData) {
        const apartmentData = this.mapFormDataToApartment(formData);
        return apartmentRepository.updateById(id, apartmentData);
    }

    async deleteApartment(id) {
        return apartmentRepository.deleteById(id);
    }

    async seedDatabase(seedData) {
        const count = await apartmentRepository.countAll();

        if (count === 0) {
            await apartmentRepository.insertMany(seedData);
            return true;
        }

        return false;
    }

    mapFormDataToApartment(formData) {
        return {
            district: formData.district,
            floor: Number(formData.floor),
            area: Number(formData.area),
            rooms: Number(formData.rooms),
            owner: {
                fullName: formData.ownerFullName,
                phone: formData.ownerPhone,
                email: formData.ownerEmail
            },
            price: Number(formData.price)
        };
    }
}

module.exports = new ApartmentService();