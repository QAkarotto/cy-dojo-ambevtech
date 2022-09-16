const faker = require('faker-br');

describe('Testes e2e em conexão QA', () => {
    it('Deve fazer o fluxo completo de criação de perfil completo ponta a ponta', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);

        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').select('QA Pleno')

        
    });
});