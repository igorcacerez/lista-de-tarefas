import {desvincularTagAtividade, vincularTagAtividade} from "../../service/atividade.service";
import {AlertError, AlertSuccess} from "../../adapters/alert";

export async function handleTarefaTag(e, atividadeEdit, tag, tagsAtividade, setTagsAtividade) {
    try {
        if (e.target.checked) {
            if (atividadeEdit) await vincularTagAtividade(atividadeEdit.id, tag.id);
            setTagsAtividade([...tagsAtividade, tag.id]);
            return;
        }

        if (atividadeEdit) await desvincularTagAtividade(atividadeEdit.id, tag.id);
        setTagsAtividade(tagsAtividade.filter(tagId => tagId !== tag.id));
    } catch (error) {
        AlertError(error.message);
    }
}