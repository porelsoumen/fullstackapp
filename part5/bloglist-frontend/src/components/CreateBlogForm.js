import React,{ useState } from 'react'
import PropTypes from 'prop-types'
const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function handleFormSubmit(event) {
    event.preventDefault()
    handleCreateBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={handleFormSubmit} className='createBlogForm'>
      <h1>create new</h1>
      <div>
                title:
        <input
          type='text'
          value={title}
          id='title'
          className='titleInput'
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        >
        </input>
      </div>
      <div>
                author:
        <input
          type='text'
          value={author}
          id='author'
          className='authorInput'
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        >
        </input>
      </div>
      <div>
                url:
        <input
          type='text'
          value={url}
          id='url'
          className='urlInput'
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        >
        </input>
      </div>
      <div>
        <button type='submit' name='create' id='create-button'>create</button>
      </div>
    </form>
  )
}

CreateBlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}
export default CreateBlogForm