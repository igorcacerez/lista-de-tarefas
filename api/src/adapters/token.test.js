require('dotenv').config();
const Token = require('./token');

describe('Token', () => {
    test('Deve gerar um token', async () => {
        const token =  Token.createToken({
            id: 1,
            email: 'teste@gmail.com',
            nome: 'Teste'
        }, null, '10s');

        expect(token).toBeDefined();
    });

    test('Deve retornar um objeto com o id', async () => {
        const bearerToken =  process.env.TOKEN_VERIFY

        Token.verifyToken(bearerToken, async function (err, decoded) {
            expect(decoded.id).toBe(1);
        });
    });
});