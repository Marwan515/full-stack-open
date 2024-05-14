import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
      return state.sort((a, b) => b.likes - a.likes)
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const {setBlogs, appendBlog, updateBlog, removeBlog} = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blog)
    // the above return the blog in a different format so i have to get the blog individually again so it come in correct format
    const newBlg = await blogService.getBlogById(newBlog.id)
    dispatch(appendBlog(newBlg))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlogL = await blogService.likeBlog(blog)
    dispatch(updateBlog(newBlogL))
  }
}

export const updateBlogs = (blog) => {
  return async dispatch => {
    dispatch(updateBlog(blog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer