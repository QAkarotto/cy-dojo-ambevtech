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
		const experienciaAtual = {
			posicao: "QA",
			empresa: faker.company.companyName(),
			localizacao: faker.address.city() + "," + faker.address.state(),
			dataInicio: faker.date.past().toLocaleDateString("en-GB"),
			descricao: faker.name.jobTitle(),
		};

		const experienciaAnterior = {
			posicao: "QA",
			empresa: faker.company.companyName(),
			localizacao: faker.address.city() + "," + faker.address.state(),
			dataInicio: faker.date.past().toLocaleDateString("en-GB"),
			dataFim: new Date().toLocaleDateString("en-GB"),
			descricao: faker.name.jobTitle(),
		};

		const formacaoCursando = {
			escola: faker.company.companyName(),
			grau: faker.name.jobTitle(),
			curso: faker.name.jobArea(),
			dataInicio: faker.date.past().toLocaleDateString("en-GB"),
			descricao: faker.name.jobDescriptor(),
		};

		const formacaoConcluida = {
			escola: faker.company.companyName(),
			grau: faker.name.jobTitle(),
			curso: faker.name.jobArea(),
			dataInicio: faker.date.past().toLocaleDateString("en-GB"),
			dataFim: new Date().toLocaleDateString("en-GB"),
			descricao: faker.name.jobDescriptor(),
		};

		cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);
		cy.criarPerfil(perfilFake);

        cy.adicionarExperienciaAtual(
			experienciaAtual.posicao,
			experienciaAtual.empresa,
			experienciaAtual.localizacao,
			experienciaAtual.dataInicio,
			experienciaAtual.descricao
		);

		cy.adicionarExperienciaAnterior(
			experienciaAnterior.posicao,
			experienciaAnterior.empresa,
			experienciaAnterior.localizacao,
			experienciaAnterior.dataInicio,
			experienciaAnterior.dataFim,
			experienciaAnterior.descricao
		);

        cy.adicionarFormacaoAcademicaCursando(
            formacaoCursando.escola,
            formacaoCursando.grau,
            formacaoCursando.curso,
            formacaoCursando.dataInicio,
            formacaoCursando.descricao
		);

		cy.adicionarFormacaoAcademicaConcluida(
            formacaoConcluida.escola,
            formacaoConcluida.grau,
            formacaoConcluida.curso,
            formacaoConcluida.dataInicio,
            formacaoConcluida.dataFim,
            formacaoConcluida.descricao
		);

        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo '+nomeFake)
        cy.get('[data-test="dashboard-editProfile"]').should('be.visible')
        cy.get('[data-test="experience-delete"]').should('be.visible').and('have.length', 2)
        cy.get('[data-test="education-delete"]').should('be.visible').and('have.length', 2)
	});
});
