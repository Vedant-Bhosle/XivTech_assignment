const axios = require("axios");
const env = require("dotenv").config();

const getWeatherData = async (cities) => {
  const apiKey = process.env.API_KEY;
  const weatherPromises = cities.map(async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    const temperature = response.data.main.temp;

    return { [city]: `${temperature}°C` };
  });

  return Object.assign({}, ...(await Promise.all(weatherPromises)));
};

module.exports = { getWeatherData };
