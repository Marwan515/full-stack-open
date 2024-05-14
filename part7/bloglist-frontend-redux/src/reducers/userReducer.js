/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const {setUser, removeUser} = userSlice.actions

export const initialUser = () => {
  return async dispatch => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInBlogappUser')
    blogService.setToken(null)
    dispatch(removeUser())
  }
}


export const loginUser = (user) => {
  return async dispatch => {
    window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}


export default userSlice.reducer