Cypress.Commands.add('apiLogin', (credentials, requestOptions = {}) => {
  return cy.request({
    method: 'POST',
    url: '/login',
    body: credentials,
    ...requestOptions,
  })
})
