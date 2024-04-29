import FetchAdapter from "../adapters/request";
import {UserSession} from "../storage/UserSession";
import {Token} from "../adapters/token";

/**
 * Método para fazer login do usuário e salvar o token
 * @param email
 * @param senha
 * @returns {Promise<JwtPayload>}
 */
export async function login(email, senha) {
    const api = new FetchAdapter();
    let login = await api.login('/usuario/login', email, senha);

    console.log('login', login)

    if (!login?.token) throw new Error('Token não retornado.');

    let dadosUsuario = await new Token(login.token).decodeToken();
    dadosUsuario.token = login.token

    UserSession.setUserData(dadosUsuario);

    return dadosUsuario;
}


/**
 * Método para buscar o usuário logado
 * e verificar se o token ainda é válido.
 * @returns {Promise<*|null>}
 */
export async function getUserLocal() {
    let usuario = UserSession.getUserData();

    if (!usuario) return null;

    // Verifica se o token expirou
    let token = new Token(usuario.token).isTokenExpired();

    if (token) {
        UserSession.clearUserData();
        return null;
    }

    return usuario;
}


/**
 * Método para fazer logout do usuário
 * @returns {Promise<void>}
 */
export const logout = async ()=> UserSession.clearUserData();


/**
 * Método para cadastrar um novo usuário no sistema
 * @param nome
 * @param email
 * @param senha
 * @param confsenha
 * @returns {Promise<*|undefined>}
 */
export const cadastrar = async ({nome, email, senha, confsenha}) => {
    const usuario = await getUserLocal();
    if (usuario) throw new Error('Você já está logado no sistema.');

    const api = new FetchAdapter()
    return await api.post("/usuario", {nome, email, senha, confsenha})
}