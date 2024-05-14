import React from 'react'
import { AppBar, Toolbar, Typography, Stack, Button, Box } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

// Figuring out how to make the nav menu right to left
const Navbar = () => {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`${currentUser.username} Successfully Logged-Out`, 5))
  }
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "white",
    marginLeft: '-1%'
  }
  return (
    <AppBar position='relative' color='info' sx={{background:'rgb(251,81,63) radial-gradient(circle, rgba(251,81,63,1) 0%, rgba(70,119,252,1) 100%);'}}>
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Box mt={2} mr={2}><BookIcon fontSize='large' /></Box>
          <Link style={linkStyle} to={"/"}>
            <Typography variant='h4'>Blog App</Typography>
          </Link>
        </Box>
        <Box>
          <Stack direction='row' spacing={2}>
            <Link to={"/users"}><Button variant='contained' size='small'>Users</Button></Link>
            {currentUser && <>
              <Link to={`/user/${currentUser.id}`}>
                <Button variant='contained' size='small' color='info'>
                  <Typography variant='caption' mr={0.5}>Me:</Typography>
                  {currentUser.username}
                </Button>
              </Link>
              <Button variant='contained' size='small' color='error' onClick={logout}>Log-Out</Button>
            </>}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar