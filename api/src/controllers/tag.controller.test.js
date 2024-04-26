const request = require ( 'supertest' );
const app = require ( '../../app' );
const sequelize = require('../models/index');
const TagModel = require ( '../models/Tag' );
const UsuarioModel = require ( '../models/Usuario' );

describe('TagController', () => {

    // Antes de cada teste, limpa a tabela de tags
    beforeEach(async () => {
        await TagModel.destroy({ truncate: true });
        await UsuarioModel.destroy({ where: { email: 'teste_tag@gmail.com' }});

        // Reset autoincrement ID
        await sequelize.query("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'tags';");
    });

    // Testes de inserção de tag
    describe("Inserção de tag", () => {
        test("Deve retornar erro de nome obrigatório", async () => {
            const response = await request(app)
                .post('/tag/')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    cor: 'azul'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("O campo nome é obrigatório.");
        });

        test("Deve inserir uma tag", async () => {
            const response = await request(app)
                .post('/tag/')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Tag de teste',
                    cor: 'azul'
                });

            expect(response.status).toBe(201);
            expect(response.body.error).toBe(false);
            expect(response.body.data.nome).toBe('Tag de teste');
            expect(response.body.data.cor).toBe('azul');
        });
    })

    // Testes de listagem de tags
    describe("Listagem de tags", () => {
        test("Deve retornar uma lista de tags", async () => {
            const response = await request(app)
                .get('/tag/')
                .set('authorization', process.env.TOKEN_TEST)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(false);
            expect(response.body.data).not.toBeNull();
        });
    })

    // Testes de alteração de tag
    describe("Alteração de tag", () => {
        test("Deve retornar erro de tag não encontrada", async () => {
            const response = await request(app)
                .put('/tag/200')
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Tag de teste',
                    cor: 'azul'
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Tag não encontrada.");
        });

        test("Deve retornar erro de alteração não informada", async () => {
            const tag = await TagModel.create({
                nome: 'Tag de teste',
                cor: 'azul',
                usuario_id: 1
            });

            const response = await request(app)
                .put(`/tag/${tag.id}`)
                .set('authorization', process.env.TOKEN_TEST)
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Nenhuma alteração foi informada.");
        });

        test("Deve alterar uma tag", async () => {
            const tag = await TagModel.create({
                nome: 'Tag de teste',
                cor: '#0000ff',
                usuario_id: 1
            });

            const response = await request(app)
                .put(`/tag/${tag.id}`)
                .set('authorization', process.env.TOKEN_TEST)
                .send({
                    nome: 'Tag alterada',
                    cor: '#ff0000'
                });

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(false);
            expect(response.body.data.nome).toBe('Tag alterada');
            expect(response.body.data.cor).toBe('#ff0000');
        });
    })

    // Testes de exclusão de tag
    describe("Exclusão de tag", () => {
        test("Deve retornar erro de tag não encontrada", async () => {
            const response = await request(app)
              .delete('/tag/200')
              .set('authorization', process.env.TOKEN_TEST)
              .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Tag não encontrada");
        });

        test("Deve retornar erro de permissão negada", async () => {
            const usuario = await UsuarioModel.create({
                nome: 'Usuário de teste',
                email: 'teste_tag@gmail.com',
                senha: '123456',
            })

            const tag = await TagModel.create({
                nome: 'Tag de teste',
                cor: 'azul',
                usuario_id: usuario.id
            });

            const response = await request(app)
                .delete(`/tag/${tag.id}`)
                .set('authorization', process.env.TOKEN_TEST)
                .send();

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Você não tem permissão para deletar essa tag.");
        });

        test("Deve deletar uma tag", async () => {
            const tag = await TagModel.create({
                nome: 'Tag de teste',
                cor: 'azul',
                usuario_id: 1
            });

            const response = await request(app)
                .delete(`/tag/${tag.id}`)
                .set('authorization', process.env.TOKEN_TEST)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.error).toBe(false);
        });
    })
})