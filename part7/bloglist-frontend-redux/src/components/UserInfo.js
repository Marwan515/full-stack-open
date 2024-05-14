/* eslint-disable react/prop-types */
import React from 'react'
import { List, ListItem, ListItemText, Divider, Container, Typography } from '@mui/material'
import Loading from './Loading'
const UserInfo = ({user}) => {
  if (!user) {
    return (
      <Loading />
    )
  }
  return (
    <Container maxWidth='sm' sx={{border: 'solid 4px black', marginTop: '6px', paddingBottom: '4px'}}>
      <Typography variant='h2'>{user.name}</Typography>
      <Typography variant='h4'>Blogs</Typography>
      <List>
        {user.blogs.map(blog => (
          <ListItem key={blog.id} sx={{padding: '5px', textAlign: 'center'}}>
            <Divider />
            <ListItemText sx={{backgroundColor: 'grey', border: 'solid 2px black'}}>
              {blog.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default UserInfo