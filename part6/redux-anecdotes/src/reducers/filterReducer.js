import { createSlice } from '@reduxjs/toolkit'
const initialState = ''
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnec(state, action) {
      return action.payload
    }
  }
})

export const { filterAnec } = filterSlice.actions
export default filterSlice.reducer