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

Cypress.Commands.add('criarPerfil', (perfil) => {
    cy.get('[data-test="dashboard-createProfile"]').click()
    cy.get('#mui-component-select-status').click()
    cy.get('li[data-value="Estudante ou Aprendendo"]').click()
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.empresa)
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.website)
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.localizacao)
    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.conhecimentos)
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.usuarioGitHub)
    cy.get('[data-test="profile-bio"] > .MuiInputBase-root').invoke('val', perfil.bio)
    cy.get('[data-test="profile-socials"]').click()
    cy.get('[data-test="profile-twitter"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.twitterUrl)
    cy.get('[data-test="profile-facebook"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.facebookUrl)
    cy.get('[data-test="profile-youtube"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.youtubeUrl)
    cy.get('[data-test="profile-linkedin"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.linkedinUrl)
    cy.get('[data-test="profile-instagram"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.instagramUrl)
    cy.get('[data-test="profile-medium"] > .MuiInputBase-root > .MuiInputBase-input').type(perfil.mediumUrl)

    cy.get('[data-test="profile-submit"]').click()
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