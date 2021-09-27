import React from 'react'

const BlogDetailed = ({ blog, user, handleDelete, handleLikes }) => {

  return (
    <div className='blogDetailed'>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}
        <button name='likes' id='like-button' onClick={handleLikes}>like</button>
      </div>
      <div>
        {blog.user ? blog.user.name : ''}
      </div>
      {blog.user && blog.user.id === user.id && <button name='remove' onClick={handleDelete} id='remove-button'>remove</button>}
    </div>
  )
}

export default BlogDetailed