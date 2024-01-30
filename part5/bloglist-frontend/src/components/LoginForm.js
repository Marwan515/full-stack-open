import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, onchUser, onchPass, onSub}) => {
  return (
    <form onSubmit={onSub}>
      <div>Username: <input id='usernameInput' type="text" value={username} name="username" onChange={onchUser} /></div>
      <br />
      <div>Password: <input id='passwordInput' type="password" value={password} name="password" onChange={onchPass} /></div>
      <br />
      <button id='loginBtn' type="submit">Log-In</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onchUser: PropTypes.func.isRequired,
  onchPass: PropTypes.func.isRequired,
  onSub: PropTypes.func.isRequired
}

export default LoginForm