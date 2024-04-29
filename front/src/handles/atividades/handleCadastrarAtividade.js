import {cadastrarAtividade} from "../../service/atividade.service";
import {AlertError, AlertSuccess} from "../../adapters/alert";

export async function handleCadastrarAtividade(atividade, atividades, setAtividades) {
    try {
        if(!atividade?.tarefa) throw new Error('Atividade inválida')
        if (!atividade.tarefa?.titulo) throw new Error('Título é obrigatório')
        if (!atividade.tarefa?.descricao) throw new Error('Descrição é obrigatória')
        if (!atividade.tarefa?.data_inicio) throw new Error('Data de início é obrigatória')
        if (!atividade.tarefa?.duracao) throw new Error('Duração é obrigatória')

        const response = await cadastrarAtividade(atividade)
        setAtividades([...atividades, response])

        AlertSuccess('Atividade cadastrada com sucesso!')
    } catch (error) {
        AlertError(error.message)
    }
}