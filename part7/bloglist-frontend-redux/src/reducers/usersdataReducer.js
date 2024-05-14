import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const initialState = null

const usersdataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    getAllUsers(state, action) {
      return action.payload
    }
  }
})

export const { getAllUsers } = usersdataSlice.actions

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(getAllUsers(users))
  }
}

export default usersdataSlice.reducer