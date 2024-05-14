import React, { useEffect } from 'react'
import { useField } from '../hooks/hooks'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({tokenSet, setMsg}) => {
  const usernameInput = useField('text')
  const passwordInput = useField('password')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMsg(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      tokenSet(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, tokenSet])


  const submit = async (event) => {
    event.preventDefault()
    login({ variables: {username: usernameInput.value, password: passwordInput.value} })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>Username: <input {...usernameInput} /></div>
        <div>Password: <input {...passwordInput} /></div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm