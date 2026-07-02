import { buildProductPayload } from '../../support/utils/factories'
import { getAdminCredentials } from '../../support/utils/credentials'

describe('ServeRest API - Produtos', () => {
  const defaultProduct = {
    id: 'BeeJh5lz3k6kSIzA',
    nome: 'Logitech MX Vertical',
    preco: 470,
    descricao: 'Mouse',
  }

  let createdProducts = []

  afterEach(() => {
    cy.wrap(createdProducts, { log: false }).each((product) => {
      cy.apiDeleteProduct(product.authorization, product.id, {
        failOnStatusCode: false,
        log: false,
      })
    })

    cy.then(() => {
      createdProducts = []
    })
  })

  it('deve listar os produtos cadastrados', () => {
    cy.apiListProducts().then(({ status, body }) => {
      const product = body.produtos.find(({ _id }) => _id === defaultProduct.id)

      expect(status).to.eq(200)
      expect(body.quantidade).to.eq(body.produtos.length)
      expect(product).to.include({
        nome: defaultProduct.nome,
        preco: defaultProduct.preco,
        descricao: defaultProduct.descricao,
      })
    })
  })

  it('deve buscar um produto existente por id', () => {
    cy.apiGetProductById(defaultProduct.id).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.include({
        nome: defaultProduct.nome,
        preco: defaultProduct.preco,
        descricao: defaultProduct.descricao,
      })
      expect(body._id).to.eq(defaultProduct.id)
    })
  })

  it('deve cadastrar produto com um usuário administrador', () => {
    getAdminCredentials().then((adminCredentials) => {
      cy.apiLogin(adminCredentials).then(({ body: loginBody }) => {
        cy.apiCreateProduct(loginBody.authorization, buildProductPayload()).then(({ status, body }) => {
          createdProducts.push({
            id: body._id,
            authorization: loginBody.authorization,
          })

          expect(status).to.eq(201)
          expect(body.message).to.eq('Cadastro realizado com sucesso')
          expect(body._id).to.be.a('string').and.not.be.empty
        })
      })
    })
  })

  it('deve rejeitar cadastro de produto com token inválido', () => {
    cy.apiCreateProduct('Bearer token-invalido', buildProductPayload(), {
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(401)
      expect(body.message).to.include('Token de acesso')
    })
  })
})
