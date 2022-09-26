//UI
Cypress.Commands.add("login", (email, password) => {
	cy.visit("login");

	cy.get('[data-test="login-email"]').type(email);
	cy.get('[data-test="login-password"]').type(password);
	cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("logout", () => {
	cy.get('[data-test="navbar-logout"]').click();
});

Cypress.Commands.add("cadastrar", (name, email, password, confirmPassword) => {
	cy.visit("cadastrar");

	cy.get('[data-test="register-name"]').type(name);
	cy.get('[data-test="register-email"]').type(email);
	cy.get('[data-test="register-password"]').type(password);
	cy.get('[data-test="register-password2"]').type(confirmPassword);
	cy.get('[data-test="register-submit"]').click();
});

Cypress.Commands.add("criarPerfil", (perfil) => {
	cy.visit("dashboard");
	cy.get('[data-test="dashboard-createProfile"]').click();
	cy.get("#mui-component-select-status").click();
	cy.get(`li[data-value="${perfil.status}"]`).click();
	cy.get('[data-test="profile-company"]').type(perfil.empresa);
	cy.get('[data-test="profile-webSite"]').type(perfil.website);
	cy.get('[data-test="profile-location"]').type(perfil.localizacao);
	cy.get('[data-test="profile-skills"]').type(perfil.conhecimentos);
	cy.get('[data-test="profile-gitHub"]').type(perfil.usuarioGitHub);
	cy.get('[data-test="profile-bio"]').invoke("val", perfil.bio);
	cy.get('[data-test="profile-socials"]').click();
	cy.get('[data-test="profile-twitter"]').type(perfil.twitterUrl);
	cy.get('[data-test="profile-facebook"]').type(perfil.facebookUrl);
	cy.get('[data-test="profile-youtube"]').type(perfil.youtubeUrl);
	cy.get('[data-test="profile-linkedin"]').type(perfil.linkedinUrl);
	cy.get('[data-test="profile-instagram"]').type(perfil.instagramUrl);
	cy.get('[data-test="profile-medium"]').type(perfil.mediumUrl);

	cy.get('[data-test="profile-submit"]').click();
});

Cypress.Commands.add(
	"adicionarExperienciaAtual",
	(posicao, empresa, localizacao, dataInicio, descricao) => {
		cy.visit("dashboard");
		cy.get('[data-test="dashboard-addExperience"]').click();
		cy.get('[data-test="experience-title"]').type(posicao);
		cy.get('[data-test="experience-company"]').type(empresa);
		cy.get('[data-test="experience-location"]').type(localizacao);
		cy.get('[data-test="experience-from"]').type(dataInicio);
		cy.get('[data-test="experience-current"]').click();
		cy.get('[data-test="experience-description"]').type(descricao);
		cy.get('[data-test="experience-submit"]').click();
	}
);

Cypress.Commands.add(
	"adicionarExperienciaAnterior",
	(posicao, empresa, localizacao, dataInicio, dataFim, descricao) => {
		cy.visit("dashboard");
		cy.get('[data-test="dashboard-addExperience"]').click();
		cy.get('[data-test="experience-title"]').type(posicao);
		cy.get('[data-test="experience-company"]').type(empresa);
		cy.get('[data-test="experience-location"]').type(localizacao);
		cy.get('[data-test="experience-from"]').type(dataInicio);
		cy.get('[data-test="experience-to"]').type(dataFim);
		cy.get('[data-test="experience-description"]').type(descricao);
		cy.get('[data-test="experience-submit"]').click();
	}
);

Cypress.Commands.add(
	"adicionarFormacaoAcademicaCursando",
	(escola, grau, curso, dataInicio, descricao) => {
		cy.visit("dashboard");
		cy.get('[data-test="dashboard-addEducation"]').click();
		cy.get('[data-test="education-school"]').type(escola);
		cy.get('[data-test="education-degree"]').type(grau);
		cy.get('[data-test="education-fieldOfStudy"]').type(curso);
		cy.get('[data-test="education-from"]').type(dataInicio);
		cy.get('[data-test="education-current"]').click();
		cy.get('[data-test="education-description"]').type(descricao);
		cy.get('[data-test="education-submit"]').click();
	}
);

Cypress.Commands.add(
	"adicionarFormacaoAcademicaConcluida",
	(escola, grau, curso, dataInicio, dataFim, descricao) => {
		cy.visit("dashboard");
		cy.get('[data-test="dashboard-addEducation"]').click();
		cy.get('[data-test="education-school"]').type(escola);
		cy.get('[data-test="education-degree"]').type(grau);
		cy.get('[data-test="education-fieldOfStudy"]').type(curso);
		cy.get('[data-test="education-from"]').type(dataInicio);
		cy.get('[data-test="education-to"]').type(dataFim);
		cy.get('[data-test="education-description"]').type(descricao);
		cy.get('[data-test="education-submit"]').click();
	}
);

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
	});
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
