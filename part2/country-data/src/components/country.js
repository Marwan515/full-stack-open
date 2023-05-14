import React from "react"

const Country = ({countryToRender}) => {
  const lan = Object.values(countryToRender.languages)
  return (
    <div>
      <h3>{countryToRender.name.common}</h3>
      <br />
      <p>official Name: {countryToRender.name.official}</p>
      <p>Capital: {countryToRender.capital}</p>
      <p>Area: {countryToRender.area}</p>
      <br />
      <ul className="black-border">
        <p>Languages</p>
        {lan.map(l => <li key={l}>{l}</li>)}
      </ul>
      <br />
      <img src={countryToRender.flags.svg} alt={countryToRender.flags.alt} />
    </div>
  )
}
export default Country