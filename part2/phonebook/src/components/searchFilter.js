import React from 'react'

const Searchfilter = ({val, oc}) => {
    return (
      <div>
        Filter Shown with <input value={val} onChange={oc} />
      </div>
    )
}
export default Searchfilter