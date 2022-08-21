describe('Funcionalidade: Login', () => {
    context('Dado que eu esteja na página de Login', () => {
        before(() => {
            cy.visit('login')
        });

        context('Quando eu inserir usuário e senha', () => {
            beforeEach(() => {
                cy.login('goku7@email.com', 'senha@123')
            });
            it('Então deve exibir a mensagem de boas vindas no dashboard', () => {


                cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
            });



        });

    });

});