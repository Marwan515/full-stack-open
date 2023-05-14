import React from "react"

const SearchResults = ({countries, countCountries, oc}) => {
  if (countCountries > 1 && countCountries < 10) {
    return (
      <>
        {countries && countries.map(c => {
          return (
            <div key={c.capital}>{c.name.common} <button onClick={() => oc(c)}>Show</button></div>
          )
        })}
      </>
    )
  } else if (countCountries > 10) {
    return (
      <p>Too many matches, Specify another filter</p>
    )
  } else {
    return ('')
  }
}

export default SearchResults