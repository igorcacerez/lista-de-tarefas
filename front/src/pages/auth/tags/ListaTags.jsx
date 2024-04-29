import {useEffect} from "react";
import {handleBuscarTags} from "../../../handles/tag/handleBuscarTags";
import {handleDeletarTag} from "../../../handles/tag/handleDeletarTag";

export function ListaTags({tags, setTags, setTagEdit}) {

    useEffect(() => {
        async function buscarTags() {
            await handleBuscarTags(setTags);
        }

        buscarTags();
    }, [])

    function carregaTabela() {
        return (
            <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                    <thead>
                    <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Cor</th>
                        <th className="text-secondary opacity-7"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tags.map(tag => (
                        <tr key={tag.id}>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-sm">{tag.nome}</h6>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={"icone-cor"} style={{backgroundColor: tag.cor}}></div>
                            </td>
                            <td className="align-middle">
                                        <span className="text-secondary font-weight-bold text-xs cursor-pointer me-3"
                                              onClick={() => setTagEdit(tag)}>
                                            Editar
                                        </span>

                                <span className="text-secondary font-weight-bold text-xs cursor-pointer"
                                      onClick={() => handleDeletarTag(tag.id, tags, setTags)}>
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
                <h6 className="mb-0">Minhas Tags</h6>
            </div>
            <div className="card-body p-3">
                {tags?.length > 0 ? carregaTabela() : <p>Nenhuma tag encontrada.</p>}
            </div>
        </div>
    )
}