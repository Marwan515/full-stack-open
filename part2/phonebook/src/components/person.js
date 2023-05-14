import React from 'react'

const Person = ({name, number, dFun, dval}) => {
    return (
      <div className='box'>{name}  {number}  <button className='delbtn' onClick={dFun} value={dval} data-name={name}>Delete</button></div>
    )
}
export default Person    