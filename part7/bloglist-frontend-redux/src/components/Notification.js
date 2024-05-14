import React from "react";
import { useSelector } from "react-redux"

export const Notification = () => {
  const notifcationMessage = useSelector(state => state.notification)
  return (
    <>
      {notifcationMessage && <div className="notification">{notifcationMessage}</div>}
    </>
  )
}

export default Notification