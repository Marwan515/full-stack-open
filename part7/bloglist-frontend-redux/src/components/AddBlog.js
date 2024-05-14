import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
/* eslint-disable react/prop-types */
const AddBlog = ({bref}) => {
  const dispatch = useDispatch()
  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: event.target.likes.value
    }
    dispatch(addBlog(blog))
    dispatch(setNotification(`New blog Added: ${blog.title}`, 6))
    bref.current.toggleVisibility()
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''
  }

  return (
    <form onSubmit={createBlog}>
      <div>Title: <input id='titleInput' type="text" name="title" placeholder='title input' /></div><br />
      <div>Author: <input id='authorInput' type="text" name="author" placeholder='author input' /></div><br />
      <div>Url: <input id='urlInput' type="text" name="url" placeholder='url input' /></div><br />
      <div>likes: <input id='likesInput' type="number" name="likes" placeholder='likes input' /></div><br />
      <button id='createBlogButton' type="submit" >Add Blog</button>
    </form>
  )
}

export default AddBlog