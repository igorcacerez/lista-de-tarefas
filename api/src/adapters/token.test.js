// cria o teste do adapter/token
const Token = require('../../src/adapters/token');
describe('Token', () => {
    test('Deve gerar um token', () => {
        const token = Token.createToken({ id: 1 });
        expect(token).toBeDefined();
    });

    test('Deve retornar um objeto com o id', async () => {
        const bearerToken =  Token.createToken({ id: 1 });

        Token.verifyToken(bearerToken, async function (err, decoded) {
            expect(decoded.id).toBe(1);
        });
    });
});