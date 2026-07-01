import { getAdminCredentials } from '../../support/utils/credentials'

describe('ServeRest API - Login', () => {
  it('deve autenticar um administrador com sucesso', () => {
    getAdminCredentials().then((adminCredentials) => {
      cy.apiLogin(adminCredentials).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.message).to.eq('Login realizado com sucesso')
        expect(body.authorization).to.match(/^Bearer\s.+/)
      })
    })
  })

  it('deve rejeitar login com senha invalida', () => {
    getAdminCredentials().then((adminCredentials) => {
      cy.apiLogin(
        {
          email: adminCredentials.email,
          password: 'senha-invalida',
        },
        {
          failOnStatusCode: false,
        },
      ).then(({ status, body }) => {
        expect(status).to.eq(401)
        expect(body.message).to.eq('Email e/ou senha inv\u00e1lidos')
      })
    })
  })
})
