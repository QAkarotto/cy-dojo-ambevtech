/// <reference types="cypress" />

describe('Funcionalidade: Perfil via API', () => {
    let token

    beforeEach(() => {
        cy.gerarTokenAPI("goku@email.com", "senha@123").then((tkn) => {
            token = tkn
        })
    });
    it('GET Deve consultar perfil do usuário', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "goku@email.com",
                "password": "senha@123"
            }
        }).then((response) => {
            let token = response.body.jwt

            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).eq(200)
                expect(response.body.company).eq("Ambev Tech")
                expect(response.body.skills[2]).eq("Cypress")
            })
        });
    });

    it.only('GET Deve consultar perfil do usuário - usando token dinâmico com custom commands', () => {

        cy.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).eq(200)
            expect(response.body.company).eq("Ambev Tech")
            expect(response.body.skills[2]).eq("Cypress")
        })

    });
});

// Escolher qualquer função do Swagger que use token 