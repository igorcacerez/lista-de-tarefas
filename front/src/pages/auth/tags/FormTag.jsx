import {useEffect, useState} from "react";
import {Input} from "../../../components/inputs/Input";
import {handleCadastrarTag} from "../../../handles/tag/handleCadastrarTag";
import {handleEditarTag} from "../../../handles/tag/handleEditarTag";

export function FormTag({ tagEdit = null, setTagEdit, titulo, tags, setTags }) {
    const [nome, setNome] = useState(tagEdit ? tagEdit.nome : '');
    const [cor, setCor] = useState(tagEdit ? tagEdit.cor : '#000000');
    const [id, setId] = useState(tagEdit ? tagEdit.id : null);

    useEffect(() => {
        clearFields();

        if (tagEdit) {
            setNome(tagEdit.nome);
            setCor(tagEdit.cor);
            setId(tagEdit.id);
        }
    }, [tagEdit])

    const clearFields = () => {
        setNome('');
        setCor('#000000');
        setId(null);
    }

    const realizarAcao = async () => {
        let dados = {nome, cor};

        if (!id) {
            clearFields();
            return await handleCadastrarTag(dados, tags, setTags);
        }

        await handleEditarTag({...dados, id}, tags, setTags)
        setTagEdit(null);
    }

    return (
        <div className="card h-100">
            <div className="card-header pb-0 p-3">
                <h6 className="mb-0">{titulo}</h6>
            </div>
            <div className="card-body p-3">
                <form>
                    <Input
                        label={"Nome da Tag"}
                        placeholder={"Ex: Trabalho"}
                        type={"text"}
                        name={"tag"}
                        value={nome}
                        setValue={setNome}
                    />

                    <Input
                        label={"Cor da Tag"}
                        type={"color"}
                        name={"cor"}
                        value={cor}
                        setValue={setCor}
                    />

                    <button type="button"
                            className="btn btn-primary"
                            onClick={realizarAcao}>
                        {tagEdit ? "Editar" : "Cadastrar"}
                    </button>

                    {tagEdit && (
                        <button type="button"
                                className="btn btn-outline-danger ms-2"
                                onClick={() => setTagEdit(null)}>
                            Cancelar
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}