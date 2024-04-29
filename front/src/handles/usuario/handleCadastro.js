import {AlertError, AlertSuccess} from "../../adapters/alert";
import {cadastrar} from "../../service/usuario.service";

export async function handleCadastro(dadosUsuario, navigate = null) {
    try {
        if (!dadosUsuario?.nome || !dadosUsuario?.email || !dadosUsuario?.senha || !dadosUsuario?.confsenha) {
            throw new Error('Preencha todos os campos.');
        }
        if (dadosUsuario.senha !== dadosUsuario.confsenha) throw new Error('As senhas não conferem.');

        // Chama a API para cadastrar o usuário
        await cadastrar(dadosUsuario);
        AlertSuccess('Usuário cadastrado com sucesso!');

        // Redireciona para a tela de login
        if (navigate) navigate('/login');

    } catch (error) {
        AlertError(error.message);
    }
}