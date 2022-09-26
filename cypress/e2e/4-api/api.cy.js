describe('Teste de API', () => {

    var dojo = {
        aula: "API",
        duracao: 3,
        professor: "Fábio"
    }

    var numero = [0, 2, 4, 6, 8, 10]

    var usuarios =[
        {
            "email":"goku@email.com",
            "password": "senha@123"
        },
        {
            "email":"goku2@email.com",
            "password": "senha@123"
        },
        {
            "email":"goku3@email.com",
            "password": "senha@123"
        },
        {
            "email":"goku4@email.com",
            "password": "senha@123"
        }
    ]

    it('Teste 1', () => {

        
    });

    it('Teste Dojo', () => {
        expect(dojo.aula).equal("API")
        expect(dojo.duracao).equal(3)
        expect(dojo.professor).contains("Fáb")
    });

    it('Teste usuarios', () => {
        expect(usuarios[0].email).contains("goku")
        expect(usuarios[0].password).contains("senha")
        expect(usuarios[1].email).contains("goku2")
        expect(usuarios[1].password).contains("senha")
        expect(usuarios[2].email).contains("goku3")
        expect(usuarios[2].password).contains("senha")
        expect(usuarios[3].email).contains("goku4")
        expect(usuarios[3].password).contains("senha")
    });

});