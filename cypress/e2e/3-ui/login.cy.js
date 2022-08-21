/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Login', () => {

    it('Deve fazer login com sucesso', () => {

        cy.login('goku7@email.com', 'senha@123')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('usuario').then((user) => {
            cy.login(user.email, user.password)
        })

        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve fazer login com sucesso - Usando importação de dados', () => {
        cy.login(usuarios[2].email, usuarios[2].password)

        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it.only('Deve fazer login com sucesso - Usando App Actions', () => {
        cy.loginAPP('goku@email.com', 'senha@123')
        cy.visit('dashboard')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

});