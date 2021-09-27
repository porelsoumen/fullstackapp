import React from 'react'

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleLogin}>
      <div>
                username
        <input
          type='text'
          value={props.username}
          name='username'
          id='username'
          onChange={({ target }) => props.setUsername(target.value)}
        >
        </input>
      </div>
      <div>
                password
        <input
          type='password'
          value={props.password}
          name='password'
          id='password'
          onChange={({ target }) => props.setPassword(target.value)}
        >
        </input>
      </div>
      <div>
        <button type='submit' name='login' id='login-button'>login</button>
      </div>
    </form>
  )
}

export default LoginForm