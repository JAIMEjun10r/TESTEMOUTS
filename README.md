# Teste Técnico - Automação com Cypress

Projeto de automação E2E e API com `Cypress` e `JavaScript`, usando a aplicação pública `ServeRest`.

## Objetivo

Este repositório foi organizado para demonstrar:

- cenários de API
- cenários de UI
- organização por domínio funcional
- uso de custom commands
- execução local
- execução em CI com GitHub Actions
- geração de relatório com Allure

## Tecnologias utilizadas

- `Node.js`
- `Cypress`
- `JavaScript`
- `Allure Report`
- `GitHub Actions`

## Aplicação utilizada

- API: `https://serverest.dev`
- Frontend: `https://front.serverest.dev`
- Swagger: `https://serverest.dev/?lang=pt-BR#/`

Como a suíte utiliza os ambientes públicos do ServeRest, não é preciso subir a aplicação localmente para executar os testes.

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

## Padrão adotado

- Testes separados por camada: `api` e `ui`
- Specs separadas por domínio funcional
- Reaproveitamento com `custom commands`
- Seletores de UI priorizando `data-testid`
- Cobertura de cenários positivos e negativos

## Pré-requisitos

Para executar o projeto localmente, você vai precisar de:

- `Node.js` 18+ instalado
- `npm` instalado

Para gerar e abrir os relatórios do Allure localmente:

- `Java` instalado

## Instalação

Clone o repositório e instale as dependências com:

```bash
npm install
```

## Configuração de credenciais

Por padrão, o projeto utiliza as credenciais públicas da própria aplicação:

- `adminEmail=fulano@qa.com`
- `adminPassword=teste`

Se quiser substituir esses valores localmente, você pode passar variáveis de ambiente no momento da execução.

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

### Executar a suíte completa

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

## Relatório Allure

O projeto possui uma configuração separada para geração de relatório:

- `cypress.config.js`: execução padrão da suíte
- `cypress.allure.config.js`: execução usada apenas para gerar o relatório Allure

Essa separação foi adotada para não misturar a integração do relatório com a configuração principal dos testes.

### Gerar relatório completo

```bash
npm run report:allure
```

### Gerar relatório apenas da API

```bash
npm run report:allure:api
```

### Gerar relatório apenas da UI

```bash
npm run report:allure:ui
```

### Abrir o relatório localmente

```bash
npm run allure:open
```

## Observação importante sobre o Allure

Se você baixar o artifact da pipeline e abrir o arquivo `index.html` com duplo clique, o navegador pode exibir o erro `500 Failed to fetch`.

Nesse caso, basta iniciar um servidor local simples na pasta do relatório:

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
- geração de relatório Allure para API
- geração de relatório Allure para UI
- upload dos relatórios como artifacts

Artifacts gerados:

- `api-allure-report`
- `ui-allure-report`

## Cenários implementados

### API

- autenticação de administrador com sucesso
- rejeição de login com senha inválida
- listagem de usuários
- busca de usuário por id
- filtro de usuário por email
- rejeição de busca com id inválido
- listagem de produtos
- busca de produto por id
- cadastro de produto com usuário administrador
- rejeição de cadastro com token inválido
- listagem de carrinhos
- busca de carrinho por id
- rejeição de busca com id inválido

### UI

- redirecionamento para login ao acessar rota protegida sem autenticação
- exibição dos campos de login
- navegação para cadastro de usuário
- erro de login com senha inválida
- erro de login com email inválido
- login com sucesso como administrador
- navegação para cadastro de usuários
- navegação para listagem de usuários
- navegação para cadastro de produtos
- navegação para listagem de produtos
- logout com sucesso
- bloqueio de rota administrativa após logout

## Decisões técnicas

- `cy.session()` foi utilizado nos cenários autenticados da UI para evitar logins repetidos e deixar a execução mais eficiente
- os `custom commands` foram organizados por domínio para melhorar legibilidade e manutenção
- os cenários foram distribuídos em arquivos menores para evitar specs excessivamente poluídas
- a configuração do Allure foi isolada em um arquivo próprio para não impactar a execução padrão da suíte

## Melhorias futuras

- publicação do relatório Allure em página estática
- ampliação de cobertura para fluxos de cadastro
- refinamento de metadados no Allure
