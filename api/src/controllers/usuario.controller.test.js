const request = require ( 'supertest' );
const app = require ( '../../app' );

describe('UsuarioController', () => {

    describe("Inserção de usuário", () => {
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
    });

    describe("Atualização de usuário", () => {
        test("Deve retornar erro de Token não informado", async () => {
            const response = await request(app)
                .put('/usuario/alterar')
                .send({nome: "Teste Alterado"});

            expect(response.status).toBe(403);
            expect(response.body.error).toBe("Token não informado");
        });

        test("Deve retornar erro de Token inválido", async () => {
            const token = "Bearer 123456";

            const response = await request(app)
                .put('/usuario/alterar')
                .set('authorization', token)
                .send({nome: 'Teste Alterado'});

            expect(response.status).toBe(403);
            expect(response.body.error).toBe("Token inválido");
        });

        test("Deve retornar erro de senhas não identicas", async () => {

            const response = await request(app)
                .put('/usuario/alterar')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Teste Alterado',
                    senha: '1234567',
                    confsenha: '123456'
                });

            expect(response.body.error).toBe("As senhas devem ser idênticas");
            expect(response.status).toBe(500);

        });

        test("Deve verificar o e-mail", async () => {
            const response = await request(app)
                .post('/usuario/validar-email')
                .send({
                    token: 'd1ca18cecaa470117672980092647dfe'
                });

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(null);
            expect(response.body.data.usuario.id).toBe(1);
        });

        test("Deve alterar o usuário", async () => {

            const response = await request(app)
                .put('/usuario/alterar')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Teste Alterado',
                    email_verificado: 'd1ca18cecaa470117672980092647dfe'
                });

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(false);
            expect(response.body.data.usuario.nome).toBe('Teste Alterado');
        });
    });


    describe('Login do usuário', () => {
        test("Deve retornar erro de E-mail e senha obrigatórios", async () => {
            const response = await request(app)
                .post('/usuario/login')
                .send();

            expect(response.status).toBe(403);
            expect(response.body.error).toBe("E-mail e senha são obrigatórios.");
        })

        test("Deve retornar erro de E-mail incorreto", async () => {

            const email = 'teste_errado@gmail.com';
            const senha = '123456'

            // Codificar as credenciais em base64
            const credentials = Buffer.from(`${email}:${senha}`).toString('base64');

            const response = await request(app)
                .post('/usuario/login')
                .set('authorization', `Basic ${credentials}`)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("E-mail ou senha informados estão incorretos.");
        })

        test("Deve retornar erro de Senha incorreta", async () => {

            const email = 'teste@gmail.com';
            const senha = '1234562345'

            // Codificar as credenciais em base64
            const credentials = Buffer.from(`${email}:${senha}`).toString('base64');

            const response = await request(app)
                .post('/usuario/login')
                .set('authorization', `Basic ${credentials}`)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("E-mail ou senha informados estão incorretos.");
        })

        test("Deve logar um usuário", async () => {

            const email = 'teste@gmail.com';
            const senha = '123456'

            // Codificar as credenciais em base64
            const credentials = Buffer.from(`${email}:${senha}`).toString('base64');

            const response = await request(app)
                .post('/usuario/login')
                .set('authorization', `Basic ${credentials}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(false);
            expect(response.body.data.token).toBeDefined();
        })
    });
});