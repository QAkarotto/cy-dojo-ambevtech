/// <reference types="cypress" />
const faker = require('faker-br');


describe('Funcionalidade: Cadastro', () => {
    // Hooks: before, after

    it('Cadastro com sucesso', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cy.cadastro(nomeFake, emailFake, senhaFake, senhaFake);

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo '+nomeFake).should('exist')

    });

    it('Deve validar mensagem quando cadastrar com e-mail repetido', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();
        
        cy.cadastro(nomeFake, emailFake, senhaFake, senhaFake);
        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo '+nomeFake).should('exist')
        
        cy.logout()

        cy.cadastro(nomeFake, emailFake, senhaFake, senhaFake);
        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')
        
    });

});