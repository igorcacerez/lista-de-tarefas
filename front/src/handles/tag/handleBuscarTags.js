import {getTags} from "../../service/tag.service";

export async function handleBuscarTags(setTags) {
    const tags = await getTags();
    setTags(tags);
}