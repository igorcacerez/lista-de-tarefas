import {useEffect, useState} from "react";
import {Input} from "../../../components/inputs/Input";
import {handleCadastrarAtividade} from "../../../handles/atividades/handleCadastrarAtividade";
import {handleEditarAtividade} from "../../../handles/atividades/handleEditarAtividade";
import {handleTarefaTag} from "../../../handles/atividades/handleTarefaTag";

export function FormAtividades({ atividadeEdit = null, setAtividadeEdit, atividades, setAtividades, tags }) {
    const [tituloAtividade, setTituloAtividade] = useState(atividadeEdit ? atividadeEdit.titulo : '');
    const [descricao, setDescricao] = useState(atividadeEdit ? atividadeEdit.descricao : '');
    const [dataInicio, setDataInicio] = useState(atividadeEdit ? atividadeEdit.data_inicio : formatDate(new Date().toISOString()));
    const [duracao, setDuracao] = useState(atividadeEdit ? atividadeEdit.data_fim : '');
    const [tagsAtividade, setTagsAtividade] = useState( []);
    const [id, setId] = useState(atividadeEdit ? atividadeEdit.id : null);

    useEffect(() => {
        clearFields();

        if (atividadeEdit) {
            setTituloAtividade(atividadeEdit.titulo);
            setDescricao(atividadeEdit.descricao);
            setDuracao(getDiferencaEmHoras(atividadeEdit.data_inicio, atividadeEdit.data_fim))
            setId(atividadeEdit.id);

            // Quando tagsAtividade é uma lista de objetos trnasformamos em uma lista de IDs
            setTagsAtividade(atividadeEdit.tags.map(tag => tag.id));

            // Converte a data para o formato de dd/mm/yyyy hh:mm
            const dataInicioConvertida = formatDate(atividadeEdit.data_inicio);
            setDataInicio(dataInicioConvertida);
        }

    }, [atividadeEdit])

    const clearFields = () => {
        setTituloAtividade('');
        setDescricao('');
        setDuracao('');
        setTagsAtividade([]);
        setId(null);

        let dataAtual = new Date().toISOString();
        dataAtual = formatDate(dataAtual)
        setDataInicio(dataAtual);

    }

    const realizarAcao = async () => {
        let dados = {
            tarefa: {
                titulo: tituloAtividade,
                descricao,
                data_inicio: dataInicio,
                duracao,
            },
            tags: tagsAtividade
        };

        if (!id) {
            await handleCadastrarAtividade(dados, atividades, setAtividades)
            return clearFields();
        }

        await handleEditarAtividade({...dados.tarefa, id}, atividades, setAtividades)
        setAtividadeEdit(null);
    }

    function alteraTagsAtividade(e, t) {
        handleTarefaTag(e, atividadeEdit, t, tagsAtividade, setTagsAtividade);
    }

    const getDiferencaEmHoras = (dataInicio, dataFim) => {
        // String para data
        const dataInicioConvertida = new Date(dataInicio);
        const dataFimConvertida = new Date(dataFim);

        // Diferença
        const diferenca = dataFimConvertida - dataInicioConvertida;
        return (diferenca / 1000 / 60 / 60); // ms -> s -> min -> h
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna mês de 0-11
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    return (
        <div className="card h-100">
            <div className="card-header pb-0 p-3">
                <h6 className="mb-0">{atividadeEdit ? "Editar Atividade" : "Cadastrar Atividade"}</h6>
            </div>
            <div className="card-body p-3">
                <form>
                    <Input
                        label={"Título da Atividade"}
                        placeholder={"Ex: Estudar React"}
                        type={"text"}
                        name={"titulo"}
                        value={tituloAtividade}
                        setValue={setTituloAtividade}
                    />

                    <Input
                        label={"Descrição da Atividade"}
                        placeholder={"Ex: Estudar React por 1 hora"}
                        type={"text"}
                        name={"descricao"}
                        value={descricao}
                        setValue={setDescricao}
                    />

                    <Input
                        label={"Data de Início"}
                        type={"datetime-local"}
                        name={"dataInicio"}
                        value={dataInicio}
                        setValue={setDataInicio}
                    />

                    <Input
                        label={"Duração em horas"}
                        type={"number"}
                        name={"duracao"}
                        value={duracao}
                        setValue={setDuracao}
                    />

                    <div>
                        <label>Tags</label>
                        <div className="d-flex">
                            {tags.map(tag => (
                                <div key={tag.id} className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={tag.id}
                                        checked={tagsAtividade.includes(tag.id)}
                                        onChange={(e) => alteraTagsAtividade(e, tag)}
                                    />
                                    <label className="form-check-label">{tag.nome}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary mt-3 me-3"
                        onClick={realizarAcao}
                    >
                        {atividadeEdit ? "Editar" : "Cadastrar"}
                    </button>

                    {atividadeEdit && (
                        <button
                            type="button"
                            className="btn btn-outline-danger mt-3"
                            onClick={() => setAtividadeEdit(null)}
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}