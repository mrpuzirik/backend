const Apartment = require('../models/Apartment');

class ApartmentRepository {
    async findAll() {
        return Apartment.find().sort({ createdAt: -1 });
    }

    async findById(id) {
        return Apartment.findById(id);
    }

    async create(apartmentData) {
        const apartment = new Apartment(apartmentData);
        return apartment.save();
    }

    async updateById(id, apartmentData) {
        return Apartment.findByIdAndUpdate(id, apartmentData, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id) {
        return Apartment.findByIdAndDelete(id);
    }

    async countAll() {
        return Apartment.countDocuments();
    }

    async insertMany(data) {
        return Apartment.insertMany(data);
    }
}

module.exports = new ApartmentRepository();