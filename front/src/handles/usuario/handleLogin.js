import {login} from "../../service/usuario.service";
import {AlertError} from "../../adapters/alert";

/**
 * Método para fazer login do usuário
 * @param email
 * @param senha
 * @param salvarUsuario
 * @param navigate
 * @returns {Promise<void>}
 */
export const handleLogin = async (email, senha, salvarUsuario, navigate) => {
    if (!email || !senha) return AlertError("Preencha todos os campos.");

    try {
        const usuario = await login(email, senha);
        salvarUsuario(usuario);

        navigate('/');

    } catch (error) {
        AlertError(error.message);
    }
}
