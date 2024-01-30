import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}
const setToken = newToken => {
  token = `Bearer ${newToken}`
  config.headers = { Authorization: token }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addBlog = async blog => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {likes: Number(blog.likes) + 1}, config)
  return response.data
}

const deleteBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, addBlog, setToken, likeBlog, deleteBlog }