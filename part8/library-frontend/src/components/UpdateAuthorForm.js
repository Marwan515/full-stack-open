import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const UpdateAuthorForm = ({setMsg, authors}) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')
  const [ updateBirth ] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}], 
    onError: (error) => {
      const message = error.graphQLErrors.map(e => e.message).join('\n')
      setMsg(message)
    }
  })

  const updateAuth = async (event) => {
    event.preventDefault()
    updateBirth({ variables: {name, setBornTo} })
    setMsg(`Author: ${name}'s Year of birth Updated to ${setBornTo}`)
    setBorn('')
    setName('')
  }

  return (
    <div>
      <form onSubmit={updateAuth}>
        <div> Author: 
          <select onChange={({target}) => setName(target.value)}>
            {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>Born: <input type='number' name='born' value={setBornTo} onChange={({target}) => setBorn(Number(target.value))} /></div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
)
}

export default UpdateAuthorForm