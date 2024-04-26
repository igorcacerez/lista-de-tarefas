const request = require ( 'supertest' );
const app = require ( '../../app' );
const UsuarioModel = require ( '../models/Usuario' );
const sequelize = require('../models/index');

describe('UsuarioController', () => {

    // Antes de cada teste, limpa a tabela de usuários
    beforeEach(async () => {
        // Limpar a tabela de usuários
        await UsuarioModel.destroy({ truncate: true });

        // Reset autoincrement ID
        await sequelize.query("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'usuarios';");

        // Inserir um usuário para testes
        await UsuarioModel.create({
            nome: 'Teste',
            email: 'teste@gmail.com',
            senha: '$2a$08$1KojwO/B/DMhihCX3ksbsuS5QteDrA6cf8MKUZraYgHfWMJ6ube.2',
            email_verificado: 'd1ca18cecaa470117672980092647dfe'
        });
    });

    describe("Inserção de usuário", () => {
        test("Deve retornar erro de nome obrigatório", async () => {
            const response = await request(app)
                .post('/usuario/')
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
                .post('/usuario/')
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
                .post('/usuario/')
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

            const response = await  request(app)
                .post('/usuario/')
                .send({
                    nome: 'Teste',
                    email: 'teste.email@gmail.com',
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
                .put('/usuario/')
                .send({nome: "Teste Alterado"});

            expect(response.status).toBe(403);
            expect(response.body.error).toBe("Token não informado");
        });

        test("Deve retornar erro de Token inválido", async () => {
            const token = "Bearer 123456";

            const response = await request(app)
                .put('/usuario/')
                .set('authorization', token)
                .send({nome: 'Teste Alterado'});

            expect(response.status).toBe(403);
            expect(response.body.error).toBe("Token inválido");
        });

        test("Deve retornar erro de senhas não identicas", async () => {

            const response = await request(app)
                .put('/usuario/')
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
            // Cria um usuário
            await UsuarioModel.create({
                nome: 'Teste',
                email: 'valida_email@gmail.com',
                senha: '123456',
                email_verificado: '111111111111111'
            })

            const response = await request(app)
                .post('/usuario/validar-email')
                .send({
                    token: '111111111111111'
                });

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(null);
            expect(response.body.data.usuario.id).toBe(2);
        });

        test("Deve alterar o usuário", async () => {
            const response = await request(app)
                .put('/usuario/')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Teste Alterado'
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
            const email = 'teste@gmail.com'
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