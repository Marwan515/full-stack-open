import { Button, FormControl, TextField } from '@mui/material'
import React from 'react'
import { commentBlog } from '../services/blogs'
import { updateBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const AddComment = ({id}) => {
  const dispatch = useDispatch()
  const updateComment = async (event) => {
    event.preventDefault()
    const updatedBlog = await commentBlog(id, event.target.comment.value)
    event.target.comment.value = ''
    dispatch(updateBlogs(updatedBlog))
  } 
  return (
    <form onSubmit={updateComment}>
      <FormControl>
        <TextField type='text' label="Comment..." name='comment' ></TextField>
        <Button type='submit' variant='contained' color='info' size='small' >Comment</Button>
      </FormControl>
    </form>
  )
}

AddComment.propTypes = {
  id: PropTypes.string.isRequired
}

export default AddComment