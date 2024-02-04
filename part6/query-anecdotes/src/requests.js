import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  return await axios.get(baseUrl).then(res => res.data)
}

export const createAnecdotes = async (anec) => {
  return await axios.post(baseUrl, anec).then(res => res.data)
}

export const voteAnecdote = async (updatedAnec) => {
  return await axios.put(`${baseUrl}/${updatedAnec.id}`, updatedAnec).then(res => res.data)
}