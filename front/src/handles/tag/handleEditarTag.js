import {editarTag} from "../../service/tag.service";

export async function handleEditarTag(tagEdit, tags, setTags) {
    const altera = await editarTag(tagEdit);

    if (altera) {
        setTags(tags.map(tag => {
            if (tag.id === tagEdit.id) return altera;
            return tag;
        }))
    }
}