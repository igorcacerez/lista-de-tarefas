const TarefaModel = require('../../models/Tarefa');

/**
 * Insere uma nova tarefa no banco de dados e retorna a tarefa inserida
 * @param {Object} tarefa
 * @param {Object} usuario
 * @param {Array|null} tags
 * @returns {Promise<tarefa>}
 */
const inserirTarefa = async (tarefa, usuario, tags = []) => {
    tarefa.usuario_id = usuario.id;

    let novaTarefa = await TarefaModel.create(tarefa);

    if (tags?.length) {
        await novaTarefa.addTags(tags);

        // A nova tarefa com as tags, retorna apenas o nome das tags
        novaTarefa = await TarefaModel.findByPk(novaTarefa.id, {
            include: {
                association: 'tags',
                attributes: ['id', 'nome', 'cor']
            },
            attributes: {
                exclude: ['usuario_id']
            }
        });
    }

    return novaTarefa;
}

module.exports = inserirTarefa;