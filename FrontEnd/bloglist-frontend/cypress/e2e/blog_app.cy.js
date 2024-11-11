describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'sagar',
      name: 'sagar rana',
      password: 'rana'

    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login from is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('sagar')
      cy.get('#password')
        .type('rana')
      cy.get('#login-button')
        .click()
      cy.contains('sagar rana logged in')
    })

    it('login fails with wrong password', function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('anancarv')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()


      cy.get('html').should('not.contain', 'sagar rana logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('sagar')
      cy.get('#password')
        .type('rana')
      cy.get('#login-button')
        .click()
      cy.contains('sagar rana logged in')
    })

    it('a new blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('Testing with cypress')
      cy.get('#author').type('Sagar Singh Rana')
      cy.get('#url').type('testing.com')
      cy.contains('add').click()
      cy.contains('Testing with cypress - Sagar Singh Rana')



    })
    it('user can like a blog', function () {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Edsger W. Dijkstra')
      cy.get('#url')
        .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
      cy.contains('add')
        .click()

      cy.contains('First class tests - Edsger W. Dijkstra')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function () {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Edsger W. Dijkstra')
      cy.get('#url')
        .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
      cy.contains('add')
        .click()

      cy.contains('First class tests - Edsger W. Dijkstra')
        .click()
      cy.contains('view')
        .click()
      cy.get('#remove')
        .click()

      cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
    })
  })

})