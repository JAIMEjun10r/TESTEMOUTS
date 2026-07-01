describe('ServeRest API - Carrinhos', () => {
  const defaultCart = {
    id: 'qbMqntef4iTOwWfg',
    idUsuario: '0uxuPY0cbmQhpEz1',
    quantidadeTotal: 3,
    precoTotal: 6180,
  }

  it('deve listar os carrinhos cadastrados', () => {
    cy.apiListCarts().then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.quantidade).to.eq(body.carrinhos.length)
      expect(body.carrinhos[0]).to.include({
        idUsuario: defaultCart.idUsuario,
        quantidadeTotal: defaultCart.quantidadeTotal,
        precoTotal: defaultCart.precoTotal,
      })
    })
  })

  it('deve buscar um carrinho existente por id', () => {
    cy.apiGetCartById(defaultCart.id).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.include({
        idUsuario: defaultCart.idUsuario,
        quantidadeTotal: defaultCart.quantidadeTotal,
        precoTotal: defaultCart.precoTotal,
      })
      expect(body._id).to.eq(defaultCart.id)
    })
  })

  it('deve rejeitar busca de carrinho com id invalido', () => {
    cy.apiGetCartById('id-invalido', {
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.id).to.include('16 caracteres alfanum')
    })
  })
})
