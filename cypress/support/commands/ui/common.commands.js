Cypress.Commands.add('getByTestId', (testId, ...args) => {
  return cy.get(`[data-testid="${testId}"]`, ...args)
})

Cypress.Commands.add('uiVisit', (path = '/login') => {
  return cy.visit(`https://front.serverest.dev${path}`)
})
