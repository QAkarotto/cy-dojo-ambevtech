const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "c5gk8u",
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://conexaoqa.herokuapp.com/'
  },
});
