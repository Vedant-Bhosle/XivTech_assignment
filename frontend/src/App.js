import React, { useState } from "react";
import axios from "axios";

function App() {
  const { REACT_APP_API } = process.env;
  console.log(REACT_APP_API);

  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState([]);
  const [weatherResults, setWeatherResults] = useState(null);

  const handleAddCity = () => {
    if (cityInput.trim() !== "") {
      setCities([...cities, cityInput.toLowerCase()]);
      setCityInput("");
    }
  };

  const handleGetWeather = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API}getWeather`, {
        cities,
      });
      console.log(response.data.weather);
      setWeatherResults(response.data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  return (
    <div className="flex flex-wrap   flex-col gap-5 items-center m-20">
      <h1 className="text-5xl  text-slate-950 font-semibold font-sans mb-10">
        Weather App
      </h1>
      <div>
        <input
          type="text"
          className="border rounded p-2"
          placeholder="Enter a city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button
          className="bg-blue-500 ml-5 text-white font-semibold p-2 rounded-3xl"
          onClick={handleAddCity}
        >
          Add City
        </button>
      </div>
      <div>
        {cities && (
          <div>
            <h1 className="text-2xl -ml-10 font-semibold font-sans">
              Added Cities
              <hr className=" border-slate-800" />
            </h1>
            {cities.map((city) => {
              return (
                <div key={city}>
                  <h1 className="text-lg font-semibold font-sans"> {city} </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <button
          className="bg-orange-600 ml-5 text-white font-semibold p-2 rounded-3xl"
          onClick={handleGetWeather}
        >
          Get Weather
        </button>
      </div>
      {weatherResults && (
        <div>
          <h2 className="text-3xl font-sans font-semibold">
            Weather Results
            <hr className=" border-slate-800" />
          </h2>
          <ul>
            {/* Object.entries is used to convert each entry {key:value} into array */}
            {Object.entries(weatherResults).map(([city, temperature]) => (
              <li className="text-xl ml-10 font-semibold" key={city}>
                {city}: {temperature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
