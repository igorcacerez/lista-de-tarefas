/**
 * Valida se o usuário possui permissão para sobre
 * um determinado item.
 * @param {Object} obj
 * @param {Object} usuario
 * @param {string|null} msgErroNaoEncontrado
 */
const validarPermissaoUsuario = (
        obj,
        usuario,
        msgErroNaoEncontrado = "Item informado não foi encontrado."
    ) => {
        if (!obj) throw new Error(msgErroNaoEncontrado);
        if (obj.usuario_id !== usuario.id) {
            throw new Error('Você não possui permissão para esta ação.');
        }
}

module.exports = {
    validarPermissaoUsuario
};