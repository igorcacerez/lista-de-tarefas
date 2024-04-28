const request = require ( 'supertest' );
const app = require ( '../../app' );
const sequelize = require('../models/index');
const TagModel = require ( '../models/Tag' );
const UsuarioModel = require ( '../models/Usuario' );
const TarefaModel = require ( '../models/Tarefa' );

describe('TarefaController', () => {

    // Antes de cada teste, limpa a tabela de tarefas
    beforeEach(async () => {
        await TarefaModel.destroy({ truncate: true });
        await TagModel.destroy({ truncate: true });
        await UsuarioModel.destroy({ where: { email: 'user_teste@gmail.com' }});

        // Reset autoincrement ID
        await sequelize.query("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'tarefas';");
        await sequelize.query("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'tags';");
    })

    // Teste de inserção de tarefa
    describe('Inserção de Tarefa', () => {
        test('Deve retornar erro de título obrigatório', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        descricao: 'Descrição da tarefa',
                        data_inicio: '2021-12-31',
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('O título é obrigatório.');
        });

        test('Deve retornar erro de descrição obrigatória', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        data_inicio: '2021-12-31',
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A descrição é obrigatória.');
        });

        test('Deve retornar erro de data de início obrigatória', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A data de início é obrigatória.');
        });

        test('Deve retornar erro de duração obrigatória', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: '2021-12-31'
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A duração é obrigatória.');
        });

        test('Deve retornar erro de data de início inválida', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: '2021-13-30',
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A data de início é inválida.');
        });

        test('Deve retornar erro de data de início menor que data atual', async () => {
            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: '2020-01-01T00:00:00.000Z',
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A data de início deve ser maior que a data atual.');
        });

        test('Deve retornar erro de duração não numérica', async () => {
            // Data atual com 2 horas a mais
            let dataAtual = '2026-12-15T00:00:00.000Z'


            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: dataAtual,
                        duracao: 'um'
                    }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('A duração deve ser um número.');
        });

        test('Deve retornar erro de tags não são um array', async () => {
            let dataAtual = '2026-12-15T00:00:00.000Z'

            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: dataAtual,
                        duracao: 1
                    },
                    tags: 'tag'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('As tags devem ser um array.');
        });

        test('Deve retornar erro de tags não são numéricas', async () => {
            let dataAtual = '2026-12-15T00:00:00.000Z'

            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: dataAtual,
                        duracao: 1
                    },
                    tags: ['tag']
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Nas tags, deve haver apenas números (identificador).');
        });

        test('Deve inserir uma tarefa sem tag', async () => {
            let dataAtual = '2026-12-15T00:00:00.000Z'

            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: dataAtual,
                        duracao: 1
                    }
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.error).toBe(false);
            expect(res.body.data.titulo).toBe('Título da tarefa');
            expect(res.body.data.descricao).toBe('Descrição da tarefa');
            expect(res.body.data.data_inicio).toBe(dataAtual);
        });

        test('Deve inserir uma tarefa com tag', async () => {
            let dataAtual = '2026-12-15T00:00:00.000Z'

            const tag = await TagModel.create({
                nome: 'Tag de teste',
                cor: 'azul',
                usuario_id: 1
            });

            const res = await request(app)
                .post('/tarefa')
                .set('Authorization', process.env.TOKEN_TEST)
                .send({
                    tarefa: {
                        titulo: 'Título da tarefa',
                        descricao: 'Descrição da tarefa',
                        data_inicio: dataAtual,
                        duracao: 1
                    },
                    tags: [tag.id]
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.error).toBe(false);
            expect(res.body.data.titulo).toBe('Título da tarefa');
            expect(res.body.data.descricao).toBe('Descrição da tarefa');
            expect(res.body.data.data_inicio).toBe(dataAtual);
            expect(res.body.data.tags[0].id).toBe(tag.id);
        });
    });

});