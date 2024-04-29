import {getUserLocal} from "./usuario.service";
import FetchAdapter from "../adapters/request";

export async function cadastrarTag(tag) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.post('/tag', tag)
}

export async function getTags() {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.get('/tag')
}

export async function editarTag(tag) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.put(`/tag/${tag.id}`, tag)
}

export async function deletarTag(tagId) {
    const usuario = await getUserLocal()

    const api = await new FetchAdapter()
    api.setBearerToken(usuario.token)

    return await api.delete(`/tag/${tagId}`)
}