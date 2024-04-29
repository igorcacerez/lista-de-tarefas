import {desvincularTagAtividade, vincularTagAtividade} from "../../service/atividade.service";
import {AlertError, AlertSuccess} from "../../adapters/alert";

export async function handleTarefaTag(e, atividadeEdit, tag, tagsAtividade, setTagsAtividade) {
    try {
        if (e.target.checked) {
            await vincularTagAtividade(atividadeEdit.id, tag.id);
            setTagsAtividade([...tagsAtividade, tag.id]);

            AlertSuccess('Tag vinculada com sucesso!');
            return;
        }

        await desvincularTagAtividade(atividadeEdit.id, tag.id);
        setTagsAtividade(tagsAtividade.filter(tagId => tagId !== tag.id));

        AlertSuccess('Tag desvinculada com sucesso!');
    } catch (error) {
        AlertError(error.message);
    }
}