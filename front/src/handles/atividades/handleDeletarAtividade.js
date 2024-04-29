import {deletarAtividade} from "../../service/atividade.service";
import {AlertError, AlertSuccess} from "../../adapters/alert";

export async function handleDeletarAtividade(atividadeId, atividades, setAtividades) {
    try {
        await deletarAtividade(atividadeId)

        const atividadesAtualizadas = atividades.filter(atividade => atividade.id !== atividadeId)
        setAtividades(atividadesAtualizadas)

        AlertSuccess('Atividade deletada com sucesso!')
    } catch (e) {
        AlertError(e.message)
    }
}