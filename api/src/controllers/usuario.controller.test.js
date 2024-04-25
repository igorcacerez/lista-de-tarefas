const request = require ( 'supertest' );
const app = require ( '../../app' );
const UsuarioController = require('./usuario.controller');

describe('UsuarioController', () => {
    // Teste de inserção de usuário
    test("Deve inserir um usuário", async () => {

        const gerar_email_unico = Date.now() + '@gmail.com';

        const response = await  request(app)
            .post('/usuario/inserir')
            .send({
                nome: 'Teste',
                email: gerar_email_unico,
                senha: '123456',
                confsenha: '123456'
            });

        expect(response.status).toBe(201);
        expect(response.body.error).toBe(false);
    })

    test("Deve retornar erro de nome obrigatório", async () => {
        const response = await request(app)
            .post('/usuario/inserir')
            .send({
                email: 'teste.nome@gmail.com',
                senha: '123456',
                confsenha: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("O nome é obrigatório.");
    });

    test("Deve retornar erro de e-mail obrigatório", async () => {
        const response = await request(app)
            .post('/usuario/inserir')
            .send({
                nome: 'Teste Email',
                senha: '123456',
                confsenha: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("O e-mail é obrigatório.");
    });

    test("Deve retornar erro de senhas não confirmam", async () => {
        const response = await request(app)
            .post('/usuario/inserir')
            .send({
                nome: 'Teste Email',
                email: 'teste.nome@gmail.com',
                senha: '123456',
                confsenha: '1234565'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("As senhas devem ser idênticas.");
    });

    // Teste de login
    test("Deve logar um usuário", async () => {

        const email = 'teste@gmail.com';
        const senha = '123456'

        // Codificar as credenciais em base64
        const credentials = Buffer.from(`${email}:${senha}`).toString('base64');

        const response = await request(app)
            .post('/usuario/login')
            .set('authorization', `Basic ${credentials}`)
            .send();

        console.log(response)

        expect(response.status).toBe(200);
        expect(response.body.error).toBe(false);
        expect(response.body.data.token).toBeDefined();
    })
});