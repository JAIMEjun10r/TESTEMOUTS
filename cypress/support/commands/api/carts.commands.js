Cypress.Commands.add('apiListCarts', (query = {}, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: '/carrinhos',
    qs: query,
    ...requestOptions,
  })
})

Cypress.Commands.add('apiGetCartById', (cartId, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `/carrinhos/${cartId}`,
    ...requestOptions,
  })
})
