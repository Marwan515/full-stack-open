import React from "react";

const Weather = ({weatherData, capitalName}) => {
  return (
    <div>
      <h3>Wheather in {capitalName}</h3>
      <br />
      <p>Temperature {weatherData.main.temp}</p>
      <img alt={weatherData.weather[0].description} src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}
export default Weather