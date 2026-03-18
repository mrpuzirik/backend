const apartmentRepository = require('../repositories/apartmentRepository');

class ApartmentService {
    async getAllApartments() {
        return apartmentRepository.findAll();
    }

    async getApartmentById(id) {
        const apartment = await apartmentRepository.findById(id);

        if (!apartment) {
            throw new Error('Квартиру не знайдено');
        }

        return apartment;
    }

    async createApartment(formData) {
        const apartmentData = this.mapFormDataToApartment(formData);
        return apartmentRepository.create(apartmentData);
    }

    async updateApartment(id, formData) {
        const apartmentData = this.mapFormDataToApartment(formData);

        const updated = await apartmentRepository.updateById(id, apartmentData);

        if (!updated) {
            throw new Error('Квартиру не знайдено для оновлення');
        }

        return updated;
    }

    async createApartmentFromGraphQL(input) {
        const apartmentData = this.mapGraphQLInputToApartment(input);
        return apartmentRepository.create(apartmentData);
    }

    async updateApartmentFromGraphQL(id, input) {
        const updateData = this.mapGraphQLInputToUpdateData(input);

        const updated = await apartmentRepository.updateById(id, updateData);

        if (!updated) {
            throw new Error('Квартиру не знайдено для оновлення');
        }

        return updated;
    }

    async deleteApartment(id) {
        const deleted = await apartmentRepository.deleteById(id);

        if (!deleted) {
            throw new Error('Квартиру не знайдено для видалення');
        }

        return deleted;
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

    mapGraphQLInputToApartment(input) {
        return {
            district: input.district,
            floor: Number(input.floor),
            area: Number(input.area),
            rooms: Number(input.rooms),
            owner: {
                fullName: input.owner.fullName,
                phone: input.owner.phone,
                email: input.owner.email
            },
            price: Number(input.price)
        };
    }

    mapGraphQLInputToUpdateData(input) {
        const updateData = {};

        if (input.district !== undefined) updateData.district = input.district;
        if (input.floor !== undefined) updateData.floor = Number(input.floor);
        if (input.area !== undefined) updateData.area = Number(input.area);
        if (input.rooms !== undefined) updateData.rooms = Number(input.rooms);
        if (input.price !== undefined) updateData.price = Number(input.price);

        if (input.owner) {
            if (input.owner.fullName !== undefined) {
                updateData['owner.fullName'] = input.owner.fullName;
            }
            if (input.owner.phone !== undefined) {
                updateData['owner.phone'] = input.owner.phone;
            }
            if (input.owner.email !== undefined) {
                updateData['owner.email'] = input.owner.email;
            }
        }

        return updateData;
    }
}

module.exports = new ApartmentService();