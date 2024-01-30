import React from "react"
import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({blog, likeOc, userId, deleteOc}) => {
  const [visible, setVisibility] = useState(false)
  const [backGround, setBackGround] = useState(null)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const viewBlog = () => {
    setVisibility(!visible)
    if (!backGround) {
      setBackGround('blogBox')
    } else {
      setBackGround(null)
    }
  }
  return (
    <div className={backGround}>
      <div className="blogWhiteBg">
        <div>
          {blog.title}  <button onClick={viewBlog}>view</button>
          <div>Author: {blog.author}</div>
        </div>
        <div style={showWhenVisible}>Link: {blog.url}</div>
        <div style={showWhenVisible}>Likes: {blog.likes} <button onClick={(e) => {likeOc(e, {id: blog.id, likes: blog.likes})}}>Like</button></div>
        {userId !== null ? <div style={showWhenVisible}>{userId.id === blog.user.id ? <button className="redButton" onClick={(e) => {deleteOc(e, blog.id, blog.title)}}>Delete Blog</button> : '' }</div> : '' }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeOc: PropTypes.func.isRequired,
  deleteOc: PropTypes.func.isRequired,
  userId: PropTypes.object
}

export default Blog