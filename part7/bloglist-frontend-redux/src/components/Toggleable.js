import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box m={2}>
      <Box style={hideWhenVisible}>
        <Button variant='outlined' color='info' size="small" id={props.buttonId} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <Box style={showWhenVisible} >
        {props.children}
        <Button variant='outlined' color='error' size="small" onClick={toggleVisibility}>Cancel</Button>
      </Box>
    </Box>
  )
})

Togglable.propTypes = {
  buttonId: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable