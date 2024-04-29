import {Container} from "../../../components/ui/Container";
import {useEffect, useState} from "react";
import {handleBuscarTags} from "../../../handles/tag/handleBuscarTags";
import {ListaAtividades} from "./ListaAtividades";
import {FormAtividades} from "./FormAtividades";

export function Atividades() {
    const [tags, setTags] = useState([])
    const [atividades, setAtividades] = useState([]);
    const [atividadeEdit, setAtividadeEdit] = useState(null);

    useEffect(() => {
       async function buscarTags() {
           await handleBuscarTags(setTags);
       }

       buscarTags();
    }, []);

    return (
        <Container>
            <div className={"row"}>
                <div className="col-12 col-xl-8 mb-4">
                    <ListaAtividades
                        atividades={atividades}
                        setAtividades={setAtividades}
                        setAtividadeEdit={setAtividadeEdit} />
                </div>

                <div className="col-12 col-xl-4">
                    <FormAtividades
                        atividadeEdit={atividadeEdit}
                        setAtividadeEdit={setAtividadeEdit}
                        atividades={atividades}
                        setAtividades={setAtividades}
                        tags={tags}
                    />
                </div>
            </div>
        </Container>
    );
}