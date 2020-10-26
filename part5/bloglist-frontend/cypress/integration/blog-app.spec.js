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
});
