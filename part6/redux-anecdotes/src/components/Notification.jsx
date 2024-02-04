import { useSelector } from "react-redux"

const Notification = () => {
  const notificationData = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  return (
    <>
      {notificationData && <div style={style}>{notificationData}</div>}
    </>
  )
}

export default Notification