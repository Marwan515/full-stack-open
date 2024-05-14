import React from "react"
import PropTypes from 'prop-types'
import { Button, Box, Card, CardContent, Typography, Divider, Link as Mlink } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer" 
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import Loading from "./Loading"
import AddComment from "./AddComment"

const Blog = ({blog}) => {
  const currentUser = useSelector(state => state.user)
  const dispatch = useDispatch()

  const likeB = (blog) => {
    if (!currentUser) {
      dispatch(setNotification('You need To be Logged-in to Like The Blog', 5))
      return null
    }
    dispatch(likeBlog(blog))
    dispatch(setNotification(`Liked: ${blog.title}`, 5))
  }

  const deleteB = (id, title) => {
    if (!currentUser) {
      dispatch(setNotification('You need To Be Logged in', 5))
      return null
    }
    if (window.confirm(`Delete ${title} ?`)){
      dispatch(deleteBlog(id))
      dispatch(setNotification(`${title} Delete`, 5))
    }
  }
  if (!blog) {
    return (
      <Loading />
    )
  }
  let address = ''
  let linkTitle = null
  if (blog.url.includes('htt')) {
    address = blog.url
    linkTitle = blog.url
  } else {
    address = `http://${blog.url}`
    linkTitle = `[${blog.url}] Link Could be Broken because the user did not provide a valid link`
  }

  return (
    <Box mt={2}>
      <Typography variant="h4" color="black">Blog: {blog.title}</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" mt={1}>{blog.title}</Typography>
          <Typography m={1} variant="subtitle1">Author: {blog.author}</Typography>
          <Typography m={1} variant="subtitle1">Link: <Mlink href={address} target="_blank" >{linkTitle}</Mlink></Typography>
          <Typography variant="subtitle1">Likes: {blog.likes}  <Button variant="contained" size="small" color="primary" onClick={() => {likeB(blog)}}>Like</Button></Typography>
          {currentUser !== null ? <Box><Divider />{currentUser.id === blog.user.id ? <Typography m={1} variant="subtitle1"><Button variant="contained" size="small" color="error" onClick={() => {deleteB(blog.id, blog.title)}}>Delete Blog</Button></Typography> : '' }</Box> : '' }
        </CardContent>
      </Card>
      <Box>
        <Typography variant="h6">Comments:</Typography>
        <AddComment id={blog.id} />
        {blog.comments.map(comment => (
          <Box key={comment} mt={1}><Card>{comment}</Card></Box>
        ))}
      </Box>
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog