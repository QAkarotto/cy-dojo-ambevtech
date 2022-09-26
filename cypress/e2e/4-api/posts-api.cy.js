describe("Funcionalidade: Posts via API", () => {
	let token;
	let postCriadoId;
	let comentarioCriado;

	beforeEach(() => {
		cy.gerarTokenAPI("goku@email.com", "senha@123").then((tkn) => {
			token = tkn;
		});

		cy.criarPostAPI(token, "Post Criado").then((response) => {
			postCriadoId = response.body._id;
		});
	});

	it("GET Deve consultar todos os posts com sucesso", () => {
		cy.consultarPostsAPI(token).then((response) => {
			expect(response.status).eq(200);
			expect(response.body).not.be.null;
			expect(response.body).to.be.a("array");
		});
	});

	it("POST Deve inserir um novo post com sucesso", () => {
		cy.criarPostAPI(token, "Novo Post").then((response) => {
			expect(response.status).eq(201);
			expect(response.body._id).not.be.null;
			expect(response.body.text).eq("Novo Post");
			expect(response.body.name).not.be.null;
		});
	});

	it("GET Deve consultar um post com sucesso", () => {
		cy.consultarUmPostAPI(token, postCriadoId).then((response) => {
			expect(response.status).eq(200);
			expect(response.body._id).not.be.null;
			expect(response.body.text).eq("Post Criado");
			expect(response.body.name).not.be.null;
		});
	});

	it("DELETE Deve deletar um post com sucesso", () => {
		cy.deletarPostAPI(token, postCriadoId).then((response) => {
			expect(response.status).eq(200);
			expect(response.body.msg).eq("Post removido");
		});
	});

	it("PUT Deve curtir um post com sucesso", () => {
		cy.curtirPostAPI(token, postCriadoId).then((response) => {
			expect(response.status).eq(200);
			expect(response.body[0].user).not.be.null;
			expect(response.body[0]._id).not.be.null;
		});
	});

	it("PUT Deve descurtir um post com sucesso", () => {
		cy.curtirPostAPI(token, postCriadoId).then(() => {
			cy.descurtirPostAPI(token, postCriadoId).then((response) => {
				expect(response.status).eq(200);
			});
		});
	});

	it("POST Deve inserir um novo comentário em um post com sucesso", () => {
		cy.comentarPostAPI(
			token,
			postCriadoId,
			"Teste comentário criado com sucesso"
		)
			.then((commentId) => {
				comentarioCriado = commentId;
			})
			.then((response) => {
				expect(response.status).eq(201);
				expect(response.body[0]._id).not.be.null;
				expect(response.body[0].text).eq(
					"Teste comentário criado com sucesso"
				);
				expect(response.body[0].name).eq("Goku");
			});
	});

	it("DELETE Deve remover um comentário de um post com sucesso", () => {
		cy.comentarPostAPI(token, postCriadoId, "Teste deleção de comentário")
			.then((response) => {
				comentarioCriado = response.body[0]._id;
			})
			.then(() => {
				cy.deletarComentarioDePostAPI(
					token,
					postCriadoId,
					comentarioCriado
				).then((response) => {
					expect(response.status).eq(200);
				});
			});
	});
});
