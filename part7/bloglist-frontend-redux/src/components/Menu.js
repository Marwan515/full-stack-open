import React from 'react'
import {
  Routes, Route, useMatch
} from 'react-router-dom'
import BlogList from './BlogList'
import UserInfo from './UserInfo'
import Users from './Users'
import LoginForm from './LoginForm'
import Togglable from './Toggleable'
import Notification from './Notification'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import Loading from './Loading'
import Blog from './Blog'

const Menu = () => {
  const currentUser = useSelector(state => state.user)
  const users = useSelector(state => state.usersdata)
  const blogs = useSelector(state => state.blog)
  const userMatch = useMatch('/user/:id')
  const blogMatch = useMatch('/blog/:id')
  if (!users) {
    return (
      <Loading />
    )
  }
  const userDa = userMatch ? users.find(a => a.id === userMatch.params.id) : null
  const selectedBlog = blogMatch ? blogs.find(a => a.id === blogMatch.params.id) : null
  return (
    <>
      <Box>
        <Notification />
        {!currentUser && <Togglable buttonId='logBtn' buttonLabel='Log In' ><LoginForm userState={currentUser} /></Togglable>}
        <Routes>
          <Route path='/' element={<BlogList user={currentUser} blogs={blogs} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<UserInfo user={userDa} />} />
          <Route path='/blog/:id' element={<Blog blog={selectedBlog} />} />
        </Routes>
      </Box>
    </>
  )
}

export default Menu