import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import UserDetail from './components/UserDetail'
import AddBlog from './components/AddBlog'
import './app.css'
import Togglable from './components/Toggleable'

const App = () => {
  const blogFormRef = useRef(null)
  const [blogs, setBlogs] = useState([])
  const [blogUpdater, setUpdateBlogs] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [blogUpdater])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const messageOutput = (msg, type) => {
    setErrorMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setErrorMessage(null)
      setMessageType(null)
    }, 6000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogappUser')
    blogService.setToken(null)
    setUser(null)
    messageOutput('Logged out successfully', 'success')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username: username, password: password})
      setUser(user)
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      messageOutput(`${user.username} Logged in successfully`, 'success')
      blogService.setToken(user.token)
      setUserName('')
      setPassword('')
    } catch (err) {
      messageOutput('wrong credentials', 'error')
    }
  }

  const handleAddBlog = async (blog) => {

    try {
      await blogService.addBlog(blog)
      setUpdateBlogs(blogUpdater + '1')
      blogFormRef.current.toggleVisibility()
      messageOutput(`A new blog ${blog.title} added!`, 'success')
    } catch (err) {
      messageOutput('Fields Required cannot be empty', 'error')
    }
  }

  const handleLike = async (e, blog) => {
    e.preventDefault()
    try {
      await blogService.likeBlog(blog)
      setUpdateBlogs(blogUpdater + '1')
      messageOutput('Blog liked', 'success')
    } catch (err) {
      messageOutput(`error while liking the blog`, 'error')
    }
  }

  const handleDelete = async (event, id, title) => {
    event.preventDefault()
    if (window.confirm(`Delete ${title} ?`)) {
      try {
        await blogService.deleteBlog(id)
        setUpdateBlogs(blogUpdater + '1')
        messageOutput(`${title} Deleted`, 'success')
      } catch (err) {
        messageOutput(`Failed to delete ${title}`, 'error')
      }
    }
  }

  const userInp = (event) => {
    setUserName(event.target.value)
  }

  const passInp = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2 className='title'>Blog List</h2>
      <br />
      {errorMessage && <div id='msgBox' className={messageType}>{errorMessage}</div>}
      <br />
      {!user && <Togglable buttonLabel='Log In' ><LoginForm username={username} password={password} onSub={handleLogin} onchUser={userInp} onchPass={passInp} /></Togglable>}
      {user && <><UserDetail username={user.username} logoutOc={handleLogout} /><br /> 
        <Togglable buttonId='addNewBlogBtn' buttonLabel='Add New Blog' ref={blogFormRef}>
          <AddBlog addNewBlog={handleAddBlog} />
        </Togglable>
      </>}
      <div className='blog-div'>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeOc={handleLike} deleteOc={handleDelete} userId={user} />
        )}
      </div>
    </div>
  )
}

export default App