/// <reference types="cypress" />

describe('Funcionalidade: Cadastro via API', () => {
    it('Deve fazer cadastro com sucesso', () => {
        var email = "goku" + Math.floor(Math.random() * 100000) + "@teste.com"

        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                "name": "Goku",
                "email": email,
                "password": "senha@123"
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(201)
            expect(response.body).have.property('jwt')
        })

    });
});