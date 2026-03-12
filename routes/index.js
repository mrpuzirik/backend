const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';
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

router.get('/', (req, res) => {
  res.render('weather', {
    cities: CITIES,
    weather: null,
    iconUrl: null,
    currentCity: null,
    error: null,
  });
});

router.get('/weather/', (req, res) => {
  res.render('weather', {
    cities: CITIES,
    weather: null,
    iconUrl: null,
    currentCity: null,
    error: null,
  });
});

router.get('/weather/search', (req, res) => {
  const city = req.query.city?.trim();
  if (!city) return res.redirect('/weather/');
  res.redirect(`/weather/${encodeURIComponent(city)}`);
});

router.get('/weather/:city', async (req, res) => {
  const citySlug = req.params.city;
  const cityEntry = CITIES.find(
      (c) => c.slug.toLowerCase() === citySlug.toLowerCase()
  );
  const cityName = cityEntry ? cityEntry.slug : citySlug;

  try {
    const weather = await fetchWeather(cityName);

    res.render('weather', {
      cities: CITIES,
      weather,
      iconUrl: getIconUrl(weather.weather[0].icon),
      currentCity: weather.name,
      error: null,
    });
  } catch (err) {
    const status = err.response?.status;
    const message =
        status === 404
            ? `Місто "${citySlug}" не знайдено.`
            : 'Помилка при отриманні даних. Перевірте API ключ або спробуйте пізніше.';

    res.render('weather', {
      cities: CITIES,
      weather: null,
      iconUrl: null,
      currentCity: citySlug,
      error: message,
    });
  }
});

module.exports = router;