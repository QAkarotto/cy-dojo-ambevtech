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
            const perfilFixture = {
                empresa: profile.empresa,
                website: profile.website,
                localizacao: profile.localizacao,
                conhecimentos: profile.conhecimentos,
                usuarioGitHub: profile.usuarioGitHub,
                bio: profile.bio,
                twitterUrl: profile.twitterUrl,
                facebookUrl: profile.facebookUrl,
                youtubeUrl: profile.youtubeUrl,
                linkedinUrl: profile.linkedinUrl,
                instagramUrl: profile.instagramUrl,
                mediumUrl: profile.mediumUrl
            }
            cy.criarPerfil(perfilFixture)
        })


        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

    it('Criação de perfil com sucesso - usando importação', () => {
        const perfilImportado = {
            empresa: perfis[1].empresa,
            website: perfis[1].website,
            localizacao: perfis[1].localizacao,
            conhecimentos: perfis[1].conhecimentos,
            usuarioGitHub: perfis[1].usuarioGitHub,
            bio: perfis[1].bio,
            twitterUrl: perfis[1].twitterUrl,
            facebookUrl: perfis[1].facebookUrl,
            youtubeUrl: perfis[1].youtubeUrl,
            linkedinUrl: perfis[1].linkedinUrl,
            instagramUrl: perfis[1].instagramUrl,
            mediumUrl: perfis[1].mediumUrl
        }
        cy.criarPerfil(perfilImportado)

        cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
    });

})