/* eslint-disable react/prop-types */
import React from 'react'
import './app.css'
import { initializeBlogs } from './reducers/blogReducer'
import { initialUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import { getUsers } from './reducers/usersdataReducer'
import { useEffect } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Menu from './components/Menu'
import Navbar from './components/Navbar'

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
      light: '#6d4c41',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#e0f7fa',
      paper: '#bdbdbd',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(10,8,8,0.7)',
      disabled: 'rgba(0,0,0,0.5)',
      hint: 'rgba(0,0,0,0.5)',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: "inline-block",
          padding: "2%"
        }
      }
    }
  }
})

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialUser())
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container style={{textAlign: 'center'}} maxWidth={false} disableGutters>  
        <Navbar />
      </Container>
      <Container>
        <br />
        <Box>
          <Menu />
        </Box>
        <br />
      </Container>
    </ThemeProvider>
  )
}

export default App