import {getAtividades} from "../../service/atividade.service";

export async function handleBuscarAtividades(setAtividades) {
    const dados = await getAtividades();
    setAtividades(dados);
}