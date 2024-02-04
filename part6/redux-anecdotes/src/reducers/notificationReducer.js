import { createSlice } from "@reduxjs/toolkit";
const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return ''
    }
  }
})

export const notify = (message, time) => {
  return async dispatch => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer