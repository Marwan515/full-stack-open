import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import AddBlog from "./AddBlog";

const testLike = () => {
  return 1
}


describe('blog rendering tests', () => {
  const bloga = {
    title: 'first test',
    author: 'testing',
    url: 'https://example.com/test',
    likes: 12
  }
  const mockHandler = jest.fn()
  const addNewBlog = jest.fn()

  let container
  let containertwo
  beforeEach(() => {
    container = render(<Blog blog={bloga} likeOc={mockHandler} deleteOc={testLike} userId={null} />).container
    containertwo = render(<AddBlog addNewBlog={addNewBlog}/>).container
  })

  test('render only title and author', () => {
    
    const element = container.querySelector('.blogWhiteBg')
    expect(element).toHaveTextContent('first test')
    expect(element).toHaveTextContent('testing')
    expect(screen.getByText('Link: https://example.com/test')).toHaveStyle('display: none')
    expect(screen.getByText('Likes: 12')).toHaveStyle('display: none')
  })

  test('clicking button shows like and url of blog', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = container.querySelector('.blogWhiteBg')
    expect(element).toHaveTextContent('first test')
    expect(element).toHaveTextContent('testing')
    expect(element).toHaveTextContent('Likes: 12')
    expect(element).toHaveTextContent('Link: https://example.com/test')
    expect(screen.getByText('Link: https://example.com/test')).not.toHaveStyle('display: none')
    expect(screen.getByText('Likes: 12')).not.toHaveStyle('display: none')
  })

  test('if like button is clicked twice the event handler responds twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('Check if the correct data is received when creating a new blog', async () => {
    const user = userEvent.setup() 

    const titleInput = containertwo.querySelector('#titleInput')
    const authorInput = containertwo.querySelector('#authorInput')
    const urlInput = containertwo.querySelector('#urlInput')
    const likesInput = containertwo.querySelector('#likesInput') 
    const addBlogBtn = containertwo.querySelector('#createBlogButton')

    const [title, author, url, likes] = ['test title', 'test author', 'test url','2']

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.type(likesInput, '2')
    await user.click(addBlogBtn)

    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0].title).toBe(title)
    expect(addNewBlog.mock.calls[0][0].author).toBe(author)
    expect(addNewBlog.mock.calls[0][0].url).toBe(url)
    expect(addNewBlog.mock.calls[0][0].likes).toBe(likes)
  })

})