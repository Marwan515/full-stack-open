import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteDote(state, action) {
      const updatingAnec = state.find(i => i.id === action.payload)
      const updatedAnec = {...updatingAnec, votes: updatingAnec.votes + 1}
      return state.map(n => n.id !== action.payload ? n : updatedAnec) 
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteDote, addAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecds = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecds))
  }
}

export const createAnecdote = (anec) => {
  return async dispatch => {
    const newAnec = await anecdotesService.createNewAnecdote((asObject(anec)))
    dispatch(addAnecdote(newAnec))
  }
}

export const voteAnecdote = (id, anec) => {
  return async dispatch => {
    const newAnec = await anecdotesService.voteAnecdote(id, {...anec, votes: anec.votes + 1})
    dispatch(voteDote(newAnec.id))
  }
}

export default anecdotesSlice.reducer