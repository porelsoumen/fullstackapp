import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)

  const blogRef = useRef(null)

  async function handleCreateBlog({ title, author, url }) {
    try {
      const response = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      blogRef.current.toggleVisibility()
      console.log(response)
      setSuccessMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }catch(exception) {
      setErrorMessage('Could not create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  async function handleLogin(event) {
    event.preventDefault()
    try {
      const response = await loginService.login({
        username,
        password
      })
      console.log(response)
      blogService.setToken(response.token)
      setUser(response)
      window.localStorage.setItem('user', JSON.stringify(response))
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  function handleLogout() {
    if (window.localStorage.getItem('user')) {
      window.localStorage.removeItem('user')
    }
  }
  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    )
  }, [])
  console.log(user)
  if (!user) {
    return (
      <div>
        <h1>Log in to Application</h1>
        {errorMessage ? <Notification state={'failure'} message={errorMessage}/> : ''}
        <LoginForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin}/>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {successMessage ? <Notification state={'success'} message={successMessage}/> : ''}
      {errorMessage ? <Notification state={'failure'} message={errorMessage}/> : ''}
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout} name='logout' id='logout-button'>logout</button>
      </div>
      <div>
        <Toggleable buttonLabel={'create new blog'} ref={blogRef}>
          <CreateBlogForm handleCreateBlog={handleCreateBlog}/>
          <button name='cancel' onClick={() => blogRef.current.toggleVisibility()}>cancel</button>
        </Toggleable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )
}

export default App