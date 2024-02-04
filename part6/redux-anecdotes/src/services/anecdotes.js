import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (anec) => {
  const response = await axios.post(baseUrl, anec)
  return response.data
}

const voteAnecdote = async (id, anec) => {
  const response = await axios.put(`${baseUrl}/${id}`, anec)
  return response.data
}

export default { getAll, createNewAnecdote, voteAnecdote }