import {AlertError, AlertSuccess} from "../../adapters/alert";
import {alterarUsuario} from "../../service/usuario.service";

export const handleAlterarUsuario = async (usuarioAlterado, setUsuario) => {
    try {
        let alteracoes = {}

        if (usuarioAlterado.nome && usuarioAlterado.nome !== "") alteracoes.nome = usuarioAlterado.nome;
        if (usuarioAlterado.email && usuarioAlterado.email !== "") alteracoes.email = usuarioAlterado.email;
        if (usuarioAlterado.senha && usuarioAlterado.senha !== "") alteracoes.senha = usuarioAlterado.senha;
        if (usuarioAlterado.confsenha && usuarioAlterado.confsenha !== "") alteracoes.confsenha = usuarioAlterado.confsenha;

        if (usuarioAlterado.senha && usuarioAlterado.senha !== usuarioAlterado.confsenha) {
            throw new Error('As senhas devem ser idênticas');
        }

        if (Object.keys(alteracoes).length === 0) {
            throw new Error('Nenhuma alteração realizada');
        }

        const result = await alterarUsuario(alteracoes);
        setUsuario(result);

        AlertSuccess('Usuário alterado com sucesso');

    } catch (error) {
        AlertError(error.message);
    }
}