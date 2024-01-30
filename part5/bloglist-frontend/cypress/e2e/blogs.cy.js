import { func } from "prop-types"

describe('Blog App', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is Shown correctly', function() {
    cy.contains('Log In').click()
    cy.get('#usernameInput')
    cy.get('#passwordInput')
  })

  describe('Login', function() {

    it('successfully login with correct credentials', function() {
      cy.contains('Log In').click()
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginBtn').click()
      cy.contains('mluukkai Logged-in')
      cy.contains('Log-Out')
    })

    it('login fails with incorrect credentials', function() {
      cy.contains('Log In').click()
      cy.get('#usernameInput').type('wrong')
      cy.get('#passwordInput').type('scorrect')
      cy.get('#loginBtn').click()
      cy.get('#msgBox')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'wrong credentials')
    })

  })

  describe('Logged in user features', function() {
    beforeEach(function() {
      cy.contains('Log In').click()
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginBtn').click()
    })

    it('A Blog can be created', function() {
      cy.get('#addNewBlogBtn').click()
      cy.get('#titleInput').type('end to end tests')
      cy.get('#authorInput').type('mluukkai')
      cy.get('#urlInput').type('mluukkaisainen.com')
      cy.get('#likesInput').type('12')
      cy.get('#createBlogButton').click()
      cy.contains('end to end tests')
      cy.contains('view').click()
    })

    it('Blog can be liked', function() {
      cy.get('#addNewBlogBtn').click()
      cy.get('#titleInput').type('end to end tests')
      cy.get('#authorInput').type('mluukkai')
      cy.get('#urlInput').type('mluukkaisainen.com')
      cy.get('#likesInput').type('12')
      cy.get('#createBlogButton').click()
      cy.contains('end to end tests')
      cy.contains('view').click()
      cy.contains('Like').click()
      cy.contains('Likes: 13')
    })

    describe('Only blog creator can delete blog', function() {

      beforeEach(function() {
        const user = {
          name: 'Matti Luukkainen2',
          username: 'mluukkai2',
          password: 'salainen2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.get('#addNewBlogBtn').click()
        cy.get('#titleInput').type('end to end tests')
        cy.get('#authorInput').type('mluukkai')
        cy.get('#urlInput').type('mluukkaisainen.com')
        cy.get('#likesInput').type('12')
        cy.get('#createBlogButton').click()
        cy.contains('end to end tests')
        cy.contains('view').click()
      })

      it('deleting blog the user created', function() {
        cy.contains('Delete Blog').click()
        cy.get('#msgBox')
          .should('contain', 'end to end tests Deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)' )
        cy.get('.blog-div').children().should('have.length', 1)
      })

      it('cant see delete option if not the creator of the blog', function() {
        cy.contains('Log-Out').click()
        cy.contains('Log In').click()
        cy.get('#usernameInput').type('mluukkai2')
        cy.get('#passwordInput').type('salainen2')
        cy.get('#loginBtn').click()
        cy.contains('view').click()
        cy.contains('Delete Blog').should('not.exist')
      })

    })

  })

  describe('Blogs are Ordered By Like', function() {
    beforeEach(function(){
      cy.contains('Log In').click()
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('salainen')
      cy.get('#loginBtn').click()
      cy.get('#addNewBlogBtn').click()
      cy.get('#titleInput').type('end to end tests 1')
      cy.get('#authorInput').type('mluukkai')
      cy.get('#urlInput').type('mluukkaisainen.com')
      cy.get('#likesInput').type('13')
      cy.get('#createBlogButton').click()
      cy.contains('end to end tests')
      cy.get('#addNewBlogBtn').click()
      cy.get('#titleInput').type('end to end tests 2')
      cy.get('#authorInput').type('mluukkai 2')
      cy.get('#urlInput').type('mluukkaisainen.com2')
      cy.get('#likesInput').type('14')
      cy.get('#createBlogButton').click()
      cy.contains('end to end tests')
    })

    it('Check The Order of blog by like', function() {
      cy.get('.blogWhiteBg').eq(0).should('contain', 'end to end tests 2')
      cy.get('.blogWhiteBg').eq(1).should('contain', 'end to end tests 1')
    })

  })

})