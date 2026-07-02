const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  allowCypressEnv: true,
  video: false,
  env: {
    adminEmail: "fulano@qa.com",
    adminPassword: "teste",
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    supportFile: "cypress/support/e2e.allure.js",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      })
      return config
    },
  },
});
