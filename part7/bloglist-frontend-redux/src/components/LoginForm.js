/* eslint-disable react/prop-types */
import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch} from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { Box, FormControl, TextField, Button } from '@mui/material'

const LoginForm = () => {
  const dispatch = useDispatch()
  const onSub = async (event) => {
    event.preventDefault()
    const credentials = {username: event.target.username.value, password: event.target.password.value}
    try {
      const user = await loginService.login(credentials)
      dispatch(loginUser(user))
      dispatch(setNotification('Logged in successfully!', 5))
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5))
    }
  }

  return (
    <Box mt={2} mb={2}>
      <form onSubmit={onSub}>
        <Box mt={2} >
          <FormControl>
            <TextField id='usernameInput' type="text" label="Username" name="username" />
          </FormControl>
        </Box>
        <Box mt={2}>
          <FormControl>
            <TextField id='passwordInput' label="Password" type="password" name="password"/>
          </FormControl>
        </Box>
        <br />
        <Box mt={2}>
          <Button variant='contained' color='primary' size="small" id='loginBtn' type="submit">Log-In</Button>
        </Box>
      </form>
    </Box>
  )
}

export default LoginForm