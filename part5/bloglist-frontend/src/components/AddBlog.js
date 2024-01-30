import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const AddBlog = ({addNewBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addNewBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  return (
    <form onSubmit={createBlog}>
      <div>Title: <input id='titleInput' type="text" value={title} onChange={event => setTitle(event.target.value)} name="title" placeholder='title input' /></div><br />
      <div>Author: <input id='authorInput' type="text" value={author} onChange={event => setAuthor(event.target.value)} name="author" placeholder='author input' /></div><br />
      <div>Url: <input id='urlInput' type="text" value={url} onChange={event => setUrl(event.target.value)} name="url" placeholder='url input' /></div><br />
      <div>likes: <input id='likesInput' type="number" value={likes} onChange={event => setLikes(event.target.value)} name="likes" placeholder='likes input' /></div><br />
      <button id='createBlogButton' type="submit" >Add Blog</button>
    </form>
  )
}

AddBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}

export default AddBlog