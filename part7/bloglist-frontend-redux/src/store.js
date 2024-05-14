import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersdataReducer from './reducers/usersdataReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    notification: notificationReducer,
    usersdata: usersdataReducer
  }
})