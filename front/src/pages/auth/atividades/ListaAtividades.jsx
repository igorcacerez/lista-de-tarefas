import {useEffect} from "react";
import {handleBuscarAtividades} from "../../../handles/atividades/handleBuscarAtividades";
import {handleDeletarAtividade} from "../../../handles/atividades/handleDeletarAtividade";

export function ListaAtividades({atividades, setAtividades, setAtividadeEdit}) {

    useEffect(() => {
        async function buscarAtividades() {
            await handleBuscarAtividades(setAtividades);
        }

        buscarAtividades();
    }, [])

    const convertDate = (date) => {
        const data = new Date(date);
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }

    function carregaTabela() {
        return (
            <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                    <thead>
                    <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Título</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tags</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            DataInício
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            DataFim
                        </th>
                        <th className="text-secondary opacity-7"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {atividades.map(atividade => (
                        <tr key={atividade.id}>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{atividade.titulo}</h6>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{atividade.tags.map(tag => tag.nome).join(', ')}</h6>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{convertDate(atividade.data_inicio)}</h6>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{convertDate(atividade.data_fim)}</h6>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">
                                    <span className="text-secondary font-weight-bold text-xs cursor-pointer me-3"
                                          onClick={() => setAtividadeEdit(atividade)}>
                                        Editar
                                    </span>

                                <span className="text-secondary font-weight-bold text-xs cursor-pointer"
                                      onClick={() => handleDeletarAtividade(atividade.id, atividades, setAtividades)}>
                                        Excluir
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="card h-100">
            <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Minhas Atividades</h6>
            </div>
            <div className="card-body p-3">
                {atividades?.length > 0 ? carregaTabela() : <p>Nenhuma atividade cadastrada</p>}
            </div>
        </div>
    )
}