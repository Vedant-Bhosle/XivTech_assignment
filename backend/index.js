const express = require("express");
const bodyparser = require("body-parser");
const { getWeatherData } = require("./controllers/getweather");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send(" <h1> Backend is running!!! </h1>");
});

app.post("/getWeather", async (req, res) => {
  try {
    const { cities } = req.body;

    if (!cities || !Array.isArray(cities)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Please provide an array of cities." });
    }

    const weatherData = await getWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
