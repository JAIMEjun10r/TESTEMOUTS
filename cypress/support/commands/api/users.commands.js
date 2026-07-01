Cypress.Commands.add('apiListUsers', (query = {}, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: '/usuarios',
    qs: query,
    ...requestOptions,
  })
})

Cypress.Commands.add('apiGetUserById', (userId, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `/usuarios/${userId}`,
    ...requestOptions,
  })
})
