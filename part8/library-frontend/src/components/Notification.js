import React from 'react'
// eslint-disable-next-line no-unused-vars
import { useContext } from 'react'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const message = useNotificationValue()

  const style = {
    border: 'solid 2px black',
    padding: 10,
    borderWidth: 2,
    marginBottom: 5
  }
  if (message) {
    return (
      <div style={style}>{message}</div>
    )
  }
}

export default Notification