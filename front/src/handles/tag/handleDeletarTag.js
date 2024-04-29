import {deletarTag} from "../../service/tag.service";

export async function handleDeletarTag(tagId, tags, setTags) {
    await deletarTag(tagId)
    setTags(tags.filter(tag => tag.id !== tagId))
}