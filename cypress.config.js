const { defineConfig } = require("cypress");
const AllureWriter  = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
	projectId: "c5gk8u",
	video: false,
	e2e: {
		setupNodeEvents(on, config) {
			AllureWriter(on, config);

      const version = config.env.version || 'prd'
      config.env = require(`./cypress/env/${version}.json`)
      config.baseUrl = config.env.baseUrl

			return config;
		},
		baseUrl: "https://conexaoqa.herokuapp.com/",
	},
});
