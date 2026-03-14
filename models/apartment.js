const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema(
    {
        district: {
            type: String,
            required: [true, 'Район є обов’язковим полем'],
            trim: true
        },
        floor: {
            type: Number,
            required: [true, 'Поверх є обов’язковим полем'],
            min: [1, 'Поверх не може бути менше 1']
        },
        area: {
            type: Number,
            required: [true, 'Площа є обов’язковим полем'],
            min: [1, 'Площа повинна бути більшою за 0']
        },
        rooms: {
            type: Number,
            required: [true, 'Кількість кімнат є обов’язковою'],
            min: [1, 'Кількість кімнат не може бути менше 1']
        },
        owner: {
            fullName: {
                type: String,
                required: [true, 'ПІБ власника є обов’язковим']
            },
            phone: {
                type: String,
                required: [true, 'Телефон власника є обов’язковим']
            },
            email: {
                type: String,
                required: [true, 'Email власника є обов’язковим']
            }
        },
        price: {
            type: Number,
            required: [true, 'Ціна є обов’язковим полем'],
            min: [0, 'Ціна не може бути від’ємною']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Apartment', apartmentSchema);