import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import Togglable from './Toggleable'
import AddBlog from './AddBlog'
import Loading from './Loading'
import { Box, Typography, Card } from '@mui/material'
/* eslint-disable react/prop-types */
const BlogList = ({user, blogs}) => {
  const blogFormRef = useRef(null)

  const linkStyle = {
    textDecoration: "none",
    color: "black"
  }

  if (!blogs) {
    return (
      <Loading />
    )
  }

  return (
    <Box sx={{textAlign: 'center'}}>
      <Typography variant='h3'>Blogs</Typography>
      {user && <><br /> 
        <Togglable buttonId='addNewBlogBtn' buttonLabel='Add New Blog' ref={blogFormRef}>
          <AddBlog bref={blogFormRef} />
        </Togglable>
      </>}

      {blogs.map(blog => (
        <Box key={blog.id} sx={{textAlign: 'center'}} mt={1}>
          <Link style={linkStyle} to={`/blog/${blog.id}`}>
            <Card>
              <Typography variant='h5'>{blog.title}</Typography>
            </Card>
          </Link>
        </Box>
     ))}
    </Box>
  )
}

export default BlogList