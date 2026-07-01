Cypress.Commands.add('uiGoToAdminSection', (testId) => {
  return cy.getByTestId(testId).click()
})
