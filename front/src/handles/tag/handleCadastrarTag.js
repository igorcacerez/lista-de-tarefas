import {AlertError, AlertSuccess} from "../../adapters/alert";
import {cadastrar} from "../../service/usuario.service";
import {cadastrarTag} from "../../service/tag.service";

export async function handleCadastrarTag(novaTag, tags = [], setTags) {
    try {
        if (!novaTag?.nome || !novaTag?.cor) throw new Error("Preencha todos os campos");
        if (tags.find(tag => tag.nome === novaTag.nome)) throw new Error("Essa tag já existe");

        const response = await cadastrarTag(novaTag);
        setTags([...tags, response]);

        AlertSuccess("Tag cadastrada com sucesso");

    } catch (error) {
        AlertError(error.message);
    }
}