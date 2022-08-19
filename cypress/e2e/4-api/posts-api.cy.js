describe('Funcionalidade: Posts via API', () => {

    let token
    let postCriado

    beforeEach(() => {
        cy.gerarToken("goku@email.com", "senha@123").then((tkn) => {
            token = tkn
        })

        cy.criarPostAPI(token, "test").then((idpost) => {
            postCriado = idpost
        })

    });

    // beforeEach(() => {
    //     cy.gerarToken("goku@email.com", "senha@123").then((tkn) => {
    //         token = tkn
    //     })
    // });

    it('GET Deve consultar todos os posts', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(200)
            expect(response.body).not.be.null
            expect(response.body).to.be.a('array')

        })

    });

    it('POST Deve inserir um novo post', () => {

        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                "text": "Oi eu sou o Goku"
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(201)
            expect(response.body._id).not.be.null
            expect(response.body.text).eq("Oi eu sou o Goku")
            expect(response.body.name).eq("Goku")

        })
    });

    it('GET Deve consultar um post', () => {

        cy.request({
            method: 'GET',
            url: `/api/posts/${postCriado}`,
            headers: {
                Cookie: token
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(200)
            expect(response.body._id).not.be.null
            expect(response.body.text).eq("test")
            expect(response.body.name).eq("Goku")

        })
    });

    it('DELETE Deve deletar um post', () => {

        cy.request({
            method: 'DELETE',
            url: `/api/posts/${postCriado}`,
            headers: {
                Cookie: token
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(200)
            expect(response.body.msg).eq("Post removido")
        })
    });

    it('PUT Deve adicionar like a um post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/like/${postCriado}`,
            headers: {
                Cookie: token
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(200)
            expect(response.body[0].user).eq("62ed60eeaac3800015ece7b6")
            expect(response.body[0]._id).not.be.null

        })
    });

    it('PUT Deve adicionar unlike a um post', () => {

        cy.request({
            method: 'PUT',
            url: `/api/posts/unlike/${postCriado}`,
            headers: {
                Cookie: token
            }
        }).then((response) => {
            cy.log(response)
            expect(response.status).eq(200)
            expect(response.body[0].user).eq("62ed60eeaac3800015ece7b6")
            expect(response.body[0]._id).not.be.null

        })
    });

});