import React, { useState } from 'react'
import BlogDetailed from './BlogDetailed'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visibility, setVisibility] = useState(false)
  async function handleLikes() {
    const updatedBlogData = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      user: blog.user.id
    }
    const response = await blogService.update(blog.id, updatedBlogData)
    console.log(response)
  }

  async function handleDelete() {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService.remove(blog.id)
    }
  }
  return (
    <div style={blogStyle} className='titleAuthor'>
      {blog.title} {blog.author}
      <button name='view' id='view-button' onClick={() => setVisibility(!visibility)}>{visibility ? 'hide' : 'show'}</button>
      <div>
        {visibility ? <BlogDetailed blog={blog} user={user} handleLikes={handleLikes} handleDelete={handleDelete}/> : ''}
      </div>
    </div>
  )
}
export default Blog