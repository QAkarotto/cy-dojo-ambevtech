class CadastroPage {


    cadastro(name, email, password, confirmPassword) {

        cy.visit('cadastrar')

        cy.get('[data-test="register-name"]').type(name)
        cy.get('[data-test="register-email"]').type(email)
        cy.get('[data-test="register-password"]').type(password)
        cy.get('[data-test="register-password2"]').type(confirmPassword)
        cy.get('[data-test="register-submit"]').click()

    }

    cadastroPJ() {

    }

    cadastroPF() {

    }

}

export default new CadastroPage()