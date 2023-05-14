import React from 'react'
const AddPerson = ({os, nval, noc, numval, numoc}) => {
    return (
      <form onSubmit={os}>
        <div>
          Name: <input value={nval} onChange={noc} />
        </div>
        <br/>
        <div>
          Number: <input value={numval} onChange={numoc} />
        </div>
        <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default AddPerson