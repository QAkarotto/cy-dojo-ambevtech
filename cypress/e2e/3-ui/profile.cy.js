/// <reference types="cypress" />
import mockProfile from "../../fixtures/profile.json";

describe("Funcionalidade: Visualizar Perfil", () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: "GET",
				url: "api/profile",
			},
			{
				statusCode: 200,
				body: mockProfile,
			}
		);

		cy.visit("perfis");
	});

	it("Deve validar o primeiro item da lista com sucesso", () => {
		cy.get('[data-test="profile-name"]')
			.first()
			.should("have.text", "Goku Guerra");
	});

	it("Deve validar o último item da lista com sucesso", () => {
		cy.get('[data-test="profile-name"]')
			.last()
			.should("have.text", "Goku dos Santos Filho");
	});

	it("Deve validar o 4º item da lista com sucesso", () => {
		cy.get('[data-test="profile-name"]')
			.eq(3)
			.should("have.text", "Goku Santos Silva");
	});
});
