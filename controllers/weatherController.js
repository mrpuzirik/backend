const { fetchWeather, getIconUrl, getCities } = require('../services/weatherService');

function index(req, res) {
  res.render('weather', {
    cities: getCities(),
    weather: null,
    iconUrl: null,
    currentCity: null,
    error: null,
  });
}

function search(req, res) {
  const city = req.query.city?.trim();
  if (!city || city.length < 2) return res.redirect('/weather/');
  res.redirect(`/weather/${encodeURIComponent(city)}`);
}

async function getCity(req, res) {
  const cities = getCities();
  const citySlug = req.params.city;
  const cityEntry = cities.find(
    (c) => c.slug.toLowerCase() === citySlug.toLowerCase()
  );
  const cityName = cityEntry ? cityEntry.slug : citySlug;

  try {
    const weather = await fetchWeather(cityName);

    res.render('weather', {
      cities,
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
      cities,
      weather: null,
      iconUrl: null,
      currentCity: citySlug,
      error: message,
    });
  }
}

module.exports = { index, search, getCity };