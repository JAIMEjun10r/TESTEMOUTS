# Teste Tecnico - Automacao com Cypress

Projeto de automacao E2E e API com `Cypress` e `JavaScript`, usando a aplicacao publica `ServeRest`.

## Objetivo

Este repositorio foi organizado para demonstrar:

- cenarios de API
- cenarios de UI
- organizacao por dominio funcional
- uso de custom commands
- execucao local
- execucao em CI com GitHub Actions
- geracao de relatorio com Allure

## Tecnologias utilizadas

- `Node.js`
- `Cypress`
- `JavaScript`
- `Allure Report`
- `GitHub Actions`

## Aplicacao utilizada

- API: `https://serverest.dev`
- Frontend: `https://front.serverest.dev`
- Swagger: `https://serverest.dev/?lang=pt-BR#/`

Como a suite utiliza os ambientes publicos do ServeRest, nao e preciso subir a aplicacao localmente para executar os testes.

## Estrutura do projeto

```text
.
|-- .github/workflows/
|-- cypress/
|   |-- e2e/
|   |   |-- api/
|   |   `-- ui/
|   `-- support/
|       |-- commands/
|       |   |-- api/
|       |   `-- ui/
|       `-- utils/
|-- cypress.config.js
|-- cypress.allure.config.js
|-- package.json
`-- README.md
```

## Padrao adotado

- Testes separados por camada: `api` e `ui`
- Specs separadas por dominio funcional
- Reaproveitamento com `custom commands`
- Seletores de UI priorizando `data-testid`
- Cobertura de cenarios positivos e negativos

## Pre-requisitos

Para executar o projeto localmente, voce vai precisar de:

- `Node.js` 18+ instalado
- `npm` instalado

Para gerar e abrir os relatorios do Allure localmente:

- `Java` instalado

## Instalacao

Clone o repositorio e instale as dependencias com:

```bash
npm install
```

## Configuracao de credenciais

Por padrao, o projeto utiliza as credenciais publicas da propria aplicacao:

- `adminEmail=fulano@qa.com`
- `adminPassword=teste`

Se quiser substituir esses valores localmente, voce pode passar variaveis de ambiente no momento da execucao.

Exemplo em terminal Unix:

```bash
CYPRESS_adminEmail=fulano@qa.com CYPRESS_adminPassword=teste npm run cy:run:api
```

Exemplo no Windows PowerShell:

```powershell
$env:CYPRESS_adminEmail="fulano@qa.com"
$env:CYPRESS_adminPassword="teste"
npm run cy:run:api
```

## Como executar

### Abrir o Cypress em modo interativo

```bash
npm run cy:open
```

### Executar a suite completa

```bash
npm run cy:run:all
```

### Executar apenas API

```bash
npm run cy:run:api
```

### Executar apenas UI

```bash
npm run cy:run:ui
```

## Relatorio Allure

O projeto possui uma configuracao separada para geracao de relatorio:

- `cypress.config.js`: execucao padrao da suite
- `cypress.allure.config.js`: execucao usada apenas para gerar o relatorio Allure

Essa separacao foi adotada para nao misturar a integracao do relatorio com a configuracao principal dos testes.

### Gerar relatorio completo

```bash
npm run report:allure
```

### Gerar relatorio apenas da API

```bash
npm run report:allure:api
```

### Gerar relatorio apenas da UI

```bash
npm run report:allure:ui
```

### Abrir o relatorio localmente

```bash
npm run allure:open
```

## Observacao importante sobre o Allure

Se voce baixar o artifact da pipeline e abrir o arquivo `index.html` com duplo clique, o navegador pode exibir o erro `500 Failed to fetch`.

Nesse caso, basta iniciar um servidor local simples na pasta do relatorio:

```bash
cd caminho/para/o/allure-report
python -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Pipeline

O projeto possui uma pipeline no GitHub Actions em:

- `.github/workflows/cypress.yml`

A pipeline executa:

- testes de API
- testes de UI
- geracao de relatorio Allure para API
- geracao de relatorio Allure para UI
- upload dos relatorios como artifacts

Artifacts gerados:

- `api-allure-report`
- `ui-allure-report`

## Cenarios implementados

### API

- autenticacao de administrador com sucesso
- rejeicao de login com senha invalida
- listagem de usuarios
- busca de usuario por id
- filtro de usuario por email
- rejeicao de busca com id invalido
- listagem de produtos
- busca de produto por id
- cadastro de produto com usuario administrador
- rejeicao de cadastro com token invalido
- listagem de carrinhos
- busca de carrinho por id
- rejeicao de busca com id invalido

### UI

- redirecionamento para login ao acessar rota protegida sem autenticacao
- exibicao dos campos de login
- navegacao para cadastro de usuario
- erro de login com senha invalida
- erro de login com email invalido
- login com sucesso como administrador
- navegacao para cadastro de usuarios
- navegacao para listagem de usuarios
- navegacao para cadastro de produtos
- navegacao para listagem de produtos
- logout com sucesso
- bloqueio de rota administrativa apos logout

## Decisoes tecnicas

- `cy.session()` foi utilizado nos cenarios autenticados da UI para evitar logins repetidos e deixar a execucao mais eficiente
- os `custom commands` foram organizados por dominio para melhorar legibilidade e manutencao
- os cenarios foram distribuidos em arquivos menores para evitar specs excessivamente poluidas
- a configuracao do Allure foi isolada em um arquivo proprio para nao impactar a execucao padrao da suite

## Melhorias futuras

- publicacao do relatorio Allure em pagina estatica
- ampliacao de cobertura para fluxos de cadastro
- refinamento de metadados no Allure
