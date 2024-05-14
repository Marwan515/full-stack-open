/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Users = () => {
  const userData = useSelector(state => state.usersdata)
  if (!userData) {
    return (
      <Loading />  
    )
  }
  return (
    <Container sx={{textAlign: 'center'}}>
      <Typography variant='h3'>Users</Typography>
      <TableContainer component={Paper} sx={{marginTop: '8px'}}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map(user => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/user/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </Container>
  )
}

export default Users