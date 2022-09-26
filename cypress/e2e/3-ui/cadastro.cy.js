/// <reference types="cypress" />
const faker = require('faker-br');
import cadastroPage from "../../support/pages/cadastro.page"


describe('Funcionalidade: Cadastro', () => {
    // Hooks: before, after

    it('Cadastro com sucesso', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo ' + nomeFake).should('exist')

    });

    it('Deve validar mensagem quando cadastrar com e-mail repetido', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();
        
        cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo ' + nomeFake).should('exist')

        cy.logout()

        cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);
        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')

    });

    it('Deve fazer cadastro com sucesso usando Pages', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cadastroPage.cadastro(nomeFake, emailFake, senhaFake, senhaFake)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

});