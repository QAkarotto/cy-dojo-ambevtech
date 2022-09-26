const faker = require("faker-br");

describe("Testes e2e em conexão QA", () => {
	it("Deve fazer o fluxo completo de criação de perfil de ponta a ponta", () => {
		const nomeFake = "Goku " + faker.name.lastName();
		const emailFake = faker.internet.email(nomeFake);
		const senhaFake = faker.internet.password();
		const perfilFake = {
			status: "QA Pleno",
			empresa: faker.company.companyName(),
			website: faker.internet.url(),
			localizacao: faker.address.city() + "," + faker.address.state(),
			conhecimentos: faker.name.jobDescriptor(),
			usuarioGitHub: faker.internet.userName(),
			bio: faker.lorem.paragraph(),
			twitterUrl: faker.internet.url(),
			facebookUrl: faker.internet.url(),
			youtubeUrl: faker.internet.url(),
			linkedinUrl: faker.internet.url(),
			instagramUrl: faker.internet.url(),
			mediumUrl: faker.internet.url(),
		};

		cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);

		cy.criarPerfil(perfilFake);
        cy.adicionarExperiencia();
	});
});
