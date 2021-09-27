describe('Blog app', function() {
  const user = {
    'name':'testuser',
    'username':'testusername',
    'password':'testuserpass'
  }
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('should open the Login form', function () {
    cy.contains('Log in to Application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function(){
    it('user can login', function (){
      cy.login({ username: user.username, password: user.password })
      cy.contains('testuser logged in')
    })
    it('fails with wrong credentials', function (){
      cy.login({ username: user.username, password: `${user.password}hufiua78hlis` })
      cy.contains('Wrong username or password')
      cy.get('.failure').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('Blog app', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })
    it('a blog can be created', function() {
      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        expect(response.body).to.have.length(0)
      })

      cy.get('#createBlog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('cypress url')
      cy.get('#create-button').click()
      cy.wait(1000)
      cy.request('GET', 'http://localhost:3003/api/blogs').then((response) => {
        expect(response.body).to.have.length(1)
      })
    })
  })
  describe('Blog app', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })
    it('a blog can be liked', function() {
      cy.get('#createBlog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('cypress url')
      cy.get('#create-button').click()
      cy.wait(4000)
      cy.reload()
      cy.get('#view-button', { timeout: 10000 }).should('be.visible')
      cy.get('#view-button').click()
      cy.contains('like')
    })
  })

  describe('Blog app', function() {
    const user1 = {
      'name':'testuser1',
      'username':'testusername1',
      'password':'testuserpass1'
    }
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/users', user1)
      cy.login({ username: user.username, password: user.password })
    })
    it('only the author can delete a blog', function() {
      cy.get('#createBlog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('cypress url')
      cy.get('#create-button').click()
      cy.wait(4000)
      cy.reload()
      cy.get('#view-button', { timeout: 10000 }).should('be.visible')
      cy.get('#view-button').click()
      cy.get('#remove-button').should('be.visible')
      cy.get('#logout-button').click()
      cy.reload()

      cy.login({ username: user1.username, password: user1.password })

      cy.get('#view-button', { timeout: 10000 }).should('be.visible')
      cy.get('#view-button').click()
      cy.get('#remove-button').should('not.exist')
    })
  })

  describe('Blog app', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })
    it.only('blogs are ordered by number of likes', function() {
      cy.createBlog({
        title: 'cypress title',
        author: 'cypress author',
        url: 'cypress url',
        likes: 0,
      })
      cy.reload()
      cy.get('#view-button', { timeout: 10000 }).should('be.visible')
      cy.get('#view-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()

      cy.createBlog({
        title: 'cypress title 1',
        author: 'cypress author 1',
        url: 'cypress url 1',
        likes: 1,
      })
      cy.reload()
      cy.get(':nth-child(5) > #view-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.reload()
      cy.get('.titleAuthor')
        .should('have.length', 2)
        .then(($els) => {
          return (
            Cypress.$.makeArray($els)
              .map((el) =>  el.innerText)
          )
        }).should('deep.equal', ['cypress title 1 cypress author 1show', 'cypress title cypress authorshow'])
    })
  })
})