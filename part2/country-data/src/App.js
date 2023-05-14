import React from "react"
import { useState, useEffect } from "react"
import SearchCountry from './components/searchCountry'
import countryService from './services/restCountriesServices'
import weatherService from './services/openWeatherMapServices'
import SearchResults from './components/searchResults'
import Country from './components/country'
import Weather from "./components/wheather"

function App() {

  const [countryData, setNewCountryDatas] = useState(null)
  const [newSearch, setNewSearch] = useState('')
  const [newCountry, setNewCountry] = useState(null)
  const [newResults, setNewResults] = useState(null)
  const [updateCountry, setUpdateCountry] = useState(null)
  const [newCountryWeather, setNewCountryWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setNewCountryDatas(countries)
      })
  }, [])

  useEffect(() => {
    setNewCountry(updateCountry)
  }, [updateCountry])

  const setWeather = (lat, lon) => {
    weatherService
      .getWeather(lat, lon, api_key)
      .then(weather => {
        setNewCountryWeather(weather)
      })
  }

  const filterCountry = () => {
    const cc = countryData.filter(i => i.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    setNewResults(cc)
    if (cc.length === 1) {
      setUpdateCountry(cc[0])
      setWeather(cc[0].capitalInfo.latlng[0], cc[0].capitalInfo.latlng[0])
    }
  }

  const searchInput = (event) => {
    setNewSearch(event.target.value)
    filterCountry()
  }

  const showCountry = obj => {
    setUpdateCountry(obj)
    setWeather(obj.capitalInfo.latlng[0], obj.capitalInfo.latlng[0])
  }

  return (
    <div className="App">
      <br />
      <SearchCountry val={newSearch} oc={searchInput} />
      <br />
      {newResults ? <SearchResults oc={showCountry} countries={newResults} countCountries={newResults.length} /> : ''}
      <br />
      {newCountry ? <Country countryToRender={newCountry} /> : ""}
      <br />
      {newCountryWeather ? <Weather weatherData={newCountryWeather} capitalName={newCountry.capital} /> : ''}
    </div>
  );
}

export default App;
