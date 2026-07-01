import { getAdminCredentials } from '../../utils/credentials'

Cypress.Commands.add('uiLoginAsAdminWithSession', () => {
  return getAdminCredentials().then((credentials) => {
    cy.session(['admin-session', credentials.email], () => {
      cy.uiVisit('/login')
      cy.getByTestId('email').type(credentials.email)
      cy.getByTestId('senha').type(credentials.password)
      cy.getByTestId('entrar').click()
      cy.location('pathname').should('eq', '/admin/home')
      cy.getByTestId('logout').should('be.visible')
    })
  })
})

Cypress.Commands.add('uiLoginAsAdmin', () => {
  return getAdminCredentials().then((credentials) => {
    cy.uiVisit('/login')
    cy.getByTestId('email').type(credentials.email)
    cy.getByTestId('senha').type(credentials.password)
    cy.getByTestId('entrar').click()
  })
})

Cypress.Commands.add('uiLogout', () => {
  return cy.getByTestId('logout').click()
})
