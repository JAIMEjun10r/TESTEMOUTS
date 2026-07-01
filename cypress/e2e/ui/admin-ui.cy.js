describe('ServeRest UI - Admin', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.uiLoginAsAdminWithSession()
    cy.uiVisit('/admin/home')
    cy.location('pathname').should('eq', '/admin/home')
  })

  it('deve navegar para cadastro de usuarios pela navbar', () => {
    cy.uiGoToAdminSection('cadastrar-usuarios')

    cy.location('pathname').should('eq', '/admin/cadastrarusuarios')
    cy.contains('Cadastro de usuários').should('be.visible')
    cy.getByTestId('nome').should('be.visible')
    cy.getByTestId('email').should('be.visible')
    cy.getByTestId('password').should('be.visible')
    cy.getByTestId('cadastrarUsuario').should('be.visible')
  })

  it('deve navegar para listagem de usuarios pela navbar', () => {
    cy.uiGoToAdminSection('listar-usuarios')

    cy.location('pathname').should('eq', '/admin/listarusuarios')
    cy.contains('Lista dos usuários').should('be.visible')
    cy.contains('Email').should('be.visible')
    cy.contains('Administrador').should('be.visible')
  })

  it('deve navegar para cadastro de produtos pela navbar', () => {
    cy.uiGoToAdminSection('cadastrar-produtos')

    cy.location('pathname').should('eq', '/admin/cadastrarprodutos')
    cy.contains('Cadastro de Produtos').should('be.visible')
    cy.getByTestId('nome').should('be.visible')
    cy.getByTestId('preco').should('be.visible')
    cy.getByTestId('descricao').should('be.visible')
    cy.getByTestId('quantity').should('be.visible')
    cy.getByTestId('cadastarProdutos').should('be.visible')
  })

  it('deve navegar para listagem de produtos pela navbar', () => {
    cy.uiGoToAdminSection('listar-produtos')

    cy.location('pathname').should('eq', '/admin/listarprodutos')
    cy.contains('Lista dos Produtos').should('be.visible')
    cy.contains('Preço').should('be.visible')
    cy.contains('Descrição').should('be.visible')
  })

  it('deve fazer logout com sucesso', () => {
    cy.uiLogout()

    cy.location('pathname').should('eq', '/login')
    cy.getByTestId('entrar').should('be.visible')
  })

  it('deve bloquear acesso a rota administrativa apos logout', () => {
    cy.uiLogout()
    cy.uiVisit('/admin/listarprodutos')

    cy.location('pathname').should('eq', '/login')
    cy.getByTestId('email').should('be.visible')
    cy.getByTestId('senha').should('be.visible')
  })
})
