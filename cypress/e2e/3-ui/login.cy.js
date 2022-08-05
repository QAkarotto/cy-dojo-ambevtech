/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('Funcionalidade: Login', () => {

    it('Deve fazer login com sucesso', () => {

        cy.login('goku7@email.com', 'senha@123')

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('usuario').then((user) => {
            cy.login(user.email, user.password)
        })

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });

    it.only('Deve fazer login com sucesso - Usando importação de dados', () => {
            cy.login(usuarios[2].email, usuarios[2].password)

        cy.get('.large').should('contain', 'Dashboard')
        cy.contains('Bem-vindo').should('exist')
    });
    
});