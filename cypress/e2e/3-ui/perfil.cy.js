/// <reference types="cypress" />
const faker = require('faker-br');
import perfis from "../../fixtures/perfis.json"

beforeEach(() => {
    const nomeFake = 'Goku ' + faker.name.lastName();
    const emailFake = faker.internet.email(nomeFake);
    const senhaFake = faker.internet.password();

    cy.cadastrar(nomeFake, emailFake, senhaFake, senhaFake)
})

describe('Funcionalidade: Perfil', () => {
    // Hooks: before, after

    it('Criação de perfil com sucesso - usando Faker', () => {
        const perfilFake = {
            empresa: faker.company.companyName(),
            website: faker.internet.url(),
            localizacao: faker.address.city() + ',' + faker.address.state(),
            conhecimentos: faker.name.jobDescriptor(),
            usuarioGitHub: faker.internet.userName(),
            bio: faker.lorem.paragraph(),
            twitterUrl: faker.internet.url(),
            facebookUrl: faker.internet.url(),
            youtubeUrl: faker.internet.url(),
            linkedinUrl: faker.internet.url(),
            instagramUrl: faker.internet.url(),
            mediumUrl: faker.internet.url()
        }

        cy.criarPerfil(perfilFake)

        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

    it('Criação de perfil com sucesso - usando fixture', () => {
        
        cy.fixture('perfil').then((profile) => {
            cy.criarPerfil(profile)
        })

        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

    it('Criação de perfil com sucesso - usando importação', () => {
        cy.criarPerfil(perfis[1])

        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

})