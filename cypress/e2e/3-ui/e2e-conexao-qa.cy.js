describe('Testes e2e em conexão QA', () => {
    it('Deve fazer o fluxo completo de criação de perfil completo ponta a ponta', () => {
        const nomeFake = 'Goku ' + faker.name.lastName();
        const emailFake = faker.internet.email(nomeFake);
        const senhaFake = faker.internet.password();

        cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake);

        
    });
});