// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.visit('login')

    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(password)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-test="navbar-logout"]').click()
})

Cypress.Commands.add('cadastrar', (name, email, password, confirmPassword) => {
    cy.visit('cadastrar')

    cy.get('[data-test="register-name"]').type(name)
    cy.get('[data-test="register-email"]').type(email)
    cy.get('[data-test="register-password"]').type(password)
    cy.get('[data-test="register-password2"]').type(confirmPassword)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('login')

    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(password)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-test="navbar-logout"]').click()
})

Cypress.Commands.add('gerarToken',(email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            "email": email,
            "password": password
        }
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add('loginAPP',(email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: {
            "email": email,
            "password": password
        }
    }).then((response) => {
        cy.setCookie('jwt', response.body.jwt)
        //return response.body.jwt
    })
})