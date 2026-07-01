describe('ServeRest API - Usuarios', () => {
  const defaultUser = {
    id: '0uxuPY0cbmQhpEz1',
    nome: 'Fulano da Silva',
    email: 'fulano@qa.com',
    administrador: 'true',
  }

  it('deve listar os usuarios cadastrados', () => {
    cy.apiListUsers().then(({ status, body }) => {
      const user = body.usuarios.find(({ _id }) => _id === defaultUser.id)

      expect(status).to.eq(200)
      expect(body.quantidade).to.eq(body.usuarios.length)
      expect(user).to.include({
        nome: defaultUser.nome,
        email: defaultUser.email,
        administrador: defaultUser.administrador,
      })
    })
  })

  it('deve buscar um usuario existente por id', () => {
    cy.apiGetUserById(defaultUser.id).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.include({
        nome: defaultUser.nome,
        email: defaultUser.email,
        administrador: defaultUser.administrador,
      })
      expect(body._id).to.eq(defaultUser.id)
    })
  })

  it('deve filtrar usuarios por email', () => {
    cy.apiListUsers({ email: defaultUser.email }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.quantidade).to.eq(1)
      expect(body.usuarios[0]).to.include({
        nome: defaultUser.nome,
        email: defaultUser.email,
        administrador: defaultUser.administrador,
      })
    })
  })

  it('deve rejeitar busca de usuario com id invalido', () => {
    cy.apiGetUserById('id-invalido', {
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.id).to.include('16 caracteres alfanum')
    })
  })
})
