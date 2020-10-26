describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/init');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown by default', function() {
    cy.contains('Blogs');
    cy.contains('log in to application');
    cy.contains('username:');
    cy.contains('password:');
    cy.contains('login');
  });

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('this');
      cy.get('#pass').type('fails');
      cy.get('#login-btn').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(178, 34, 34)');
    });

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('niilo22');
      cy.get('#pass').type('mrew');
      cy.get('#login-btn').click();
      cy.contains('Logged in as niilo22');
    });
  });
});
