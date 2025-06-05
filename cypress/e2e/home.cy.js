describe('Test home page', () => {
  it('home page', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('eq', 'Amazon Prime Replica')
  })
})