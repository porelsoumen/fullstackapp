import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogDetailed from './BlogDetailed'
import CreateBlogForm from './CreateBlogForm'

describe('Blog tests', () => {
  let component
  const blog = {
    'title': 'blog title 2',
    'author': 'sohini',
    'likes': 80,
    'url': 'another url',
    'user': 'testuserid'
  }
  const user = {
    'token': 'abcd1234',
    'username': 'testuser',
    'name': 'testusername',
    'id': 'testuserid'
  }
  beforeEach(() => {
    component = render(<Blog blog={blog} user={user}/>)
  })
  it('test only author and title are visible', () => {
    expect(component.container).toHaveTextContent('blog title 2')
    expect(component.container).toHaveTextContent('sohini')
    expect(component.container).not.toHaveTextContent(80)
    expect(component.container).not.toHaveTextContent('another url')
    const div = component.container.querySelector('.titleAuthor')

    expect(div).toHaveTextContent('blog title 2')
  })
  it('should show url and likes when view button is clicked', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    expect(component.container).toHaveTextContent('another url')
    expect(component.container).toHaveTextContent(80)
  })
  it('should call the event handler when like button is clicked', () => {
    const likeHandler = jest.fn()
    const component = render(<BlogDetailed blog={blog} user={user} handleLikes={likeHandler} />)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
  it('should check the details when submitting the form', () => {
    const submitHandler = jest.fn()

    const component = render(<CreateBlogForm handleCreateBlog={submitHandler}/>)
    const author = component.container.querySelector('.authorInput')
    const title = component.container.querySelector('.titleInput')
    const url = component.container.querySelector('.urlInput')
    const createButton = component.getByText('create')

    fireEvent.change(author, { target: { value: 'blog author' } })
    fireEvent.change(title, { target: { value: 'blog title' } })
    fireEvent.change(url, { target: { value: 'blog url' } })
    fireEvent.submit(createButton)

    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0].title).toBe('blog title')
    expect(submitHandler.mock.calls[0][0].author).toBe('blog author')
    expect(submitHandler.mock.calls[0][0].url).toBe('blog url')
  })
})