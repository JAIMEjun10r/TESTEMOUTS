Cypress.Commands.add('apiListProducts', (query = {}, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: '/produtos',
    qs: query,
    ...requestOptions,
  })
})

Cypress.Commands.add('apiCreateProduct', (authorization, product, requestOptions = {}) => {
  return cy.request({
    method: 'POST',
    url: '/produtos',
    headers: {
      Authorization: authorization,
    },
    body: product,
    ...requestOptions,
  })
})

Cypress.Commands.add('apiGetProductById', (productId, requestOptions = {}) => {
  return cy.request({
    method: 'GET',
    url: `/produtos/${productId}`,
    ...requestOptions,
  })
})

Cypress.Commands.add('apiDeleteProduct', (authorization, productId, requestOptions = {}) => {
  return cy.request({
    method: 'DELETE',
    url: `/produtos/${productId}`,
    headers: {
      Authorization: authorization,
    },
    ...requestOptions,
  })
})
