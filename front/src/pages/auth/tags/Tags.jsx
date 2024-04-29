import {Container} from "../../../components/ui/Container";
import {Input} from "../../../components/inputs/Input";
import {FormTag} from "./FormTag";
import {useState} from "react";
import {ListaTags} from "./ListaTags";

export function Tags() {
    const [tags, setTags] = useState([])
    const [tagEdit, setTagEdit] = useState(null);

    return (
        <Container>
            <div className={"row"}>
                <div className="col-12 col-xl-8 mb-3">
                    <ListaTags tags={tags} setTags={setTags} setTagEdit={setTagEdit} />
                </div>

                <div className="col-12 col-xl-4">
                    <FormTag
                        titulo={tagEdit ? "Editar Tag" : "Adicionar Tag"}
                        tagEdit={tagEdit}
                        setTagEdit={setTagEdit}
                        tags={tags}
                        setTags={setTags}
                    />
                </div>
            </div>
        </Container>
    );
}