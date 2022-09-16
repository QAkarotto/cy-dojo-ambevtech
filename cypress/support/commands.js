//UI
Cypress.Commands.add("login", (email, password) => {
	cy.visit("login");

	cy.get(
		'[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(email);
	cy.get(
		'[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(password);
	cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("logout", () => {
	cy.get('[data-test="navbar-logout"]').click();
});

Cypress.Commands.add("cadastrar", (name, email, password, confirmPassword) => {
	cy.visit("cadastrar");

	cy.get(
		'[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(name);
	cy.get(
		'[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(email);
	cy.get(
		'[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(password);
	cy.get(
		'[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input'
	).type(confirmPassword);
	cy.get('[data-test="register-submit"]').click();
});

//API

Cypress.Commands.add("gerarTokenAPI", (email, password) => {
	cy.request({
		method: "POST",
		url: "/api/auth",
		body: {
			email: email,
			password: password,
		},
	}).then((response) => {
		return response.body.jwt;
	});
});

Cypress.Commands.add("criarPostAPI", (token, text) => {
	cy.request({
		method: "POST",
		url: "/api/posts",
		headers: {
			Cookie: token,
		},
		body: {
			text: text,
		},
	})
});

Cypress.Commands.add("consultarPostsAPI", (token) => {
	cy.request({
		method: "GET",
		url: "/api/posts",
		headers: {
			Cookie: token,
		},
	});
});

Cypress.Commands.add("consultarUmPostAPI", (token, postId) => {
	cy.request({
		method: "GET",
		url: `/api/posts/${postId}`,
		headers: {
			Cookie: token,
		},
	});
});

Cypress.Commands.add("deletarPostAPI", (token, postId) => {
	cy.request({
		method: "DELETE",
		url: `/api/posts/${postId}`,
		headers: {
			Cookie: token,
		},
	});
});

Cypress.Commands.add("curtirPostAPI", (token, postId) => {
	cy.request({
		method: "PUT",
		url: `/api/posts/like/${postId}`,
		headers: {
			Cookie: token,
		},
	});
});

Cypress.Commands.add("descurtirPostAPI", (token, postId) => {
	cy.request({
		method: "PUT",
		url: `/api/posts/unlike/${postId}`,
		headers: {
			Cookie: token,
		},
	});
});

Cypress.Commands.add("comentarPostAPI", (token, postId, text) => {
	cy.request({
		method: "POST",
		url: `/api/posts/comment/${postId}`,
		headers: {
			Cookie: token,
		},
		body: {
			text: text,
		},
	});
});

Cypress.Commands.add(
	"deletarComentarioDePostAPI",
	(token, postId, commentId) => {
		cy.request({
			method: "DELETE",
			url: `/api/posts/comment/${postId}/${commentId}`,
			headers: {
				Cookie: token,
			},
		});
	}
);
