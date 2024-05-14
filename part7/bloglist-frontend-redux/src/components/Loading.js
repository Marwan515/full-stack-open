import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{textAlign: 'center'}} mt={2}>
      <CircularProgress />
      <Typography variant='h4'>Loading...</Typography>
    </Box>
  )
}

export default Loading