/// <reference types="cypress" />

describe('Funcionalidade: Login via API', () => {

    it('Deve fazer login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "goku@email.com",
                "password": "senha@123"
            }
        }).should((response) => {
            expect(response.status).eq(200)
            expect(response.body).have.property('jwt')
            expect(response.duration).lessThan(1000)
        })

    });

});