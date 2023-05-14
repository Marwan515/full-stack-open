import React from "react"

const SearchCountry = ({oc, val}) => {
  return (
    <div>
      Search Country: <input onChange={oc} value={val} />
    </div>
  )
}
export default SearchCountry