import {getUserLocal} from "./usuario.service";
import FetchAdapter from "../adapters/request";

export async function cadastrarAtividade(atividade) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.post('/tarefa', atividade)
}

export async function getAtividades() {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.get('/tarefa')
}

export async function editarAtividade(atividade) {
    const usuario = await getUserLocal()
    const {id} = atividade

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    delete atividade.id

    return await api.put(`/tarefa/${id}`, atividade)
}

export async function deletarAtividade(atividadeId) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.delete(`/tarefa/${atividadeId}`)
}

export async function vincularTagAtividade(atividadeId, tagId) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.post(`/tarefa/${atividadeId}/tag/${tagId}`)
}

export async function desvincularTagAtividade(atividadeId, tagId) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.delete(`/tarefa/${atividadeId}/tag/${tagId}`)
}

export async function getAtividadesDoDia() {
    const usuario = await getUserLocal()

    // Data inicio e fim
    const data = new Date()
    const inicio = new Date(data.getFullYear(), data.getMonth(), data.getDate())
    const fim = new Date(data.getFullYear(), data.getMonth(), data.getDate() + 1)

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    let url = `/tarefa/data?inicio=${inicio.toISOString()}&fim=${fim.toISOString()}`

    return await api.get(url)
}