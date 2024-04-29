import {Container} from "../../../components/ui/Container";
import {useEffect, useState} from "react";
import {getAtividades, getAtividadesDoDia} from "../../../service/atividade.service";
import {Card} from "../../../components/cards/Card";
import {convertDate} from "../../../helpers/dates";
import {Link} from "react-router-dom";
import {getTags} from "../../../service/tag.service";
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
    const [atividades, setAtividades] = useState([])
    const [dadosGrafico, setDadosGrafico] = useState({})

    useEffect(() => {
        async function buscarDadosGraficoDeTags() {
            let todasAsTags = await getTags()
            let totasAsAtividades = await getAtividades()

            let datas = {
                labels: [],
                datasets: [
                    {
                        label: 'Atividades por Tag',
                        data: [],
                        backgroundColor: [
                        ],
                        borderColor: [
                        ],
                        borderWidth: 1,
                    }
                ]
            }

            if (Array.isArray(todasAsTags)) {
                console.log(todasAsTags)

                await todasAsTags.forEach(tag => {
                    let atividadesDaTag = totasAsAtividades.filter(atividade => {
                        if (atividade.tags.length > 0) {
                            return atividade.tags.find(tagAtividade => tagAtividade.id === tag.id)
                        }
                    })

                    let quantidadeAtividades = atividadesDaTag.length

                    // Cor hexadecimal em rgba com 0.5 de opacidade
                    let cor = tag.cor + '80'

                    datas.labels.push(tag.nome)
                    datas.datasets[0].data.push(quantidadeAtividades)
                    datas.datasets[0].backgroundColor.push(cor)
                    datas.datasets[0].borderColor.push(tag.cor)
                })

                console.log(datas)

                setDadosGrafico(datas)
            }
        }

        buscarDadosGraficoDeTags()

        getAtividadesDoDia()
            .then(response => setAtividades(response))
            .catch(error => console.error(error))
    }, []);

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <Container>
            <div className="row mt-4">
                <div className="col-lg-7 mb-lg-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="d-flex flex-column h-100">
                                        <p className="mb-1 pt-2 text-bold">Maximize a Organização</p>
                                        <h5 class="font-weight-bolder">Lista de Tarefas com Calendário</h5>
                                        <p className="mb-5">
                                            Mergulhe na eficiência com a nossa interface intuitiva que combina sua lista
                                            de tarefas com um calendário dinâmico. Encontre a documentação completa e
                                            dicas para aprimorar seu fluxo de trabalho.
                                        </p>
                                        <Link to={"/calendario"} className="text-body text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                            Ver Calendário
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                                    <div className="bg-gradient-primary border-radius-lg h-100">
                                        <img src="../assets/img/shapes/waves-white.svg"
                                             className="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                                             alt="waves"/>
                                        <div
                                            className="position-relative d-flex align-items-center justify-content-center h-100">
                                            <img className="w-100 position-relative z-index-2 pt-4"
                                                 src="../assets/img/illustrations/rocket-white.png" alt="rocket"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="card h-100 p-3">
                        <div className="overflow-hidden position-relative border-radius-lg bg-cover h-100"
                             style={{backgroundImage: "url('../assets/img/ivancik.jpg')"}}>
                            <span className="mask bg-gradient-dark"></span>
                            <div className="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                                <h5 class="text-white font-weight-bolder mb-4 pt-2">Alcance Novas Alturas</h5>
                                <p className="text-white">
                                    Descubra como priorizar e agendar suas tarefas mais críticas com visões perspicazes.
                                    Seja o primeiro a capturar oportunidades com nosso sistema de planejamento estratégico.
                                </p>
                                <span className="text-white text-sm font-weight-bold mb-0 icon-move-right mt-auto">
                                    Em Breve
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-5 mb-lg-0 mb-4">
                    <div className="card z-index-2">
                        <div className="card-body p-3">
                            {dadosGrafico?.labels?.length > 0 ? (
                                <Pie data={dadosGrafico} options={options} />
                            ) : (
                                <p>Nenhuma tag cadastrada</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <Card title={"Atividades do dia"}>
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col">Atividade</th>
                                    <th scope="col">Início</th>
                                    <th scope="col">Fim</th>
                                    <th scope="col">Tags</th>
                                </tr>
                                </thead>
                                <tbody>
                                {atividades?.map(atividade => (
                                    <tr key={atividade.id}>
                                        <td>{atividade.titulo}</td>
                                        <td>{convertDate(atividade.data_inicio)}</td>
                                        <td>{convertDate(atividade.data_fim)}</td>
                                        <td>{atividade.tags.length > 0 ? atividade.tags?.map(tag => tag.nome).join(', ') : "Não possui"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    )
}