const buildUniqueSuffix = () => `${Date.now()}-${Cypress._.random(1000, 9999)}`

export const buildProductPayload = (overrides = {}) => {
  const suffix = buildUniqueSuffix()

  return {
    nome: `Produto QA ${suffix}`,
    preco: 100 + Cypress._.random(1, 500),
    descricao: `Produto criado por Jaime ${suffix}`,
    quantidade: 5 + Cypress._.random(1, 20),
    ...overrides,
  }
}
