describe('ServeRest UI - Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('deve redirecionar usuário não autenticado para a tela de login', () => {
    cy.uiVisit('/admin/home')

    cy.location('pathname').should('eq', '/login')
    cy.getByTestId('email').should('be.visible')
    cy.getByTestId('senha').should('be.visible')
    cy.getByTestId('entrar').should('be.visible')
  })

  it('deve exibir os campos da tela de login e navegar para cadastro', () => {
    cy.uiVisit('/login')

    cy.getByTestId('email').should('be.visible')
    cy.getByTestId('senha').should('be.visible')
    cy.getByTestId('entrar').should('be.visible')
    cy.getByTestId('cadastrar').click()

    cy.location('pathname').should('eq', '/cadastrarusuarios')
    cy.getByTestId('nome').should('be.visible')
    cy.getByTestId('email').should('be.visible')
    cy.getByTestId('password').should('be.visible')
  })

  it('deve exibir mensagem de erro ao tentar login com senha inválida', () => {
    cy.uiVisit('/login')

    cy.getByTestId('email').type('fulano@qa.com')
    cy.getByTestId('senha').type('senha-invalida')
    cy.getByTestId('entrar').click()

    cy.contains('Email e/ou senha inválidos').should('be.visible')
    cy.location('pathname').should('eq', '/login')
  })

  it('deve exibir mensagem de erro ao tentar login com email inválido', () => {
    cy.uiVisit('/login')

    cy.getByTestId('email').type('inexistente@qa.com')
    cy.getByTestId('senha').type('teste')
    cy.getByTestId('entrar').click()

    cy.contains('Email e/ou senha inválidos').should('be.visible')
    cy.location('pathname').should('eq', '/login')
  })

  it('deve realizar login com sucesso como administrador', () => {
    cy.uiLoginAsAdmin()

    cy.location('pathname').should('eq', '/admin/home')
    cy.contains('Bem Vindo').should('be.visible')
    cy.getByTestId('logout').should('be.visible')
  })
})
