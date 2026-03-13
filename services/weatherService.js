const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const CITIES = [
    { name: 'Київ',     slug: 'Kyiv',     flag: '🇺🇦', author: true },
    { name: 'Лондон',   slug: 'London',   flag: '🇬🇧' },
    { name: 'Париж',    slug: 'Paris',    flag: '🇫🇷' },
    { name: 'Берлін',   slug: 'Berlin',   flag: '🇩🇪' },
    { name: 'Токіо',    slug: 'Tokyo',    flag: '🇯🇵' },
    { name: 'Нью-Йорк', slug: 'New York', flag: '🇺🇸' },
    { name: 'Дубай',    slug: 'Dubai',    flag: '🇦🇪' },
];

async function fetchWeather(city) {
    const response = await axios.get(BASE_URL, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'uk',
        },
    });
    return response.data;
}

function getIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function getCities() {
    return CITIES;
}

module.exports = { fetchWeather, getIconUrl, getCities };