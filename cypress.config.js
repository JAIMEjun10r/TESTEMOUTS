const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: false,
  env: {
    adminEmail: "fulano@qa.com",
    adminPassword: "teste",
  },

  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
