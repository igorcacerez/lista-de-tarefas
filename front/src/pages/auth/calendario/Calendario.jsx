import {Container} from "../../../components/ui/Container";
import {useEffect, useState} from "react";
import {getAtividades} from "../../../service/atividade.service";
import {buscarFeriados} from "../../../service/feriados.service";
import FullCalendar from '@fullcalendar/react';
import Swal from "sweetalert2"; // plugin de visualização de grade de dias
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // Para visualização em lista
import ptLocale from '@fullcalendar/core/locales/pt';

export function Calendario() {
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function buscarAtividades() {
            const atividades = await getAtividades()
            const feriados = await buscarFeriados()

            console.log(atividades)

            // Criar um novo array de eventos a partir das atividades e feriados
            const novosEventos = [
                ...atividades.map(atividade => ({
                    title: atividade.titulo,
                    start: converteData(atividade.data_inicio),
                    end: converteData(atividade.data_fim),
                    color: atividade.tags[0]?.cor || '#5bea72',
                    textColor: '#1d1d1d',
                    extendedProps: {
                        descricao: atividade.descricao,
                        tags: atividade.tags
                    }
                })),
                ...feriados.map(feriado => ({
                    title: feriado.localName,
                    start: new Date(feriado.date),
                    end: new Date(feriado.date),
                    color: '#ff9f89',
                    textColor: '#1d1d1d'
                }))
            ];

            // Atualiza o estado de eventos uma única vez
            setEvents(novosEventos);
            console.log(novosEventos)
        }

        buscarAtividades()
    }, [])

    function converteData(data) {
        return new Date(data)
    }

    function handleEventClick(info) {

        let html = ""

        if (info.event.end) {
            html += `<p><strong>Início:</strong> ${info.event.start?.toLocaleString()}</p>`
            html += `<p><strong>Fim:</strong> ${info.event.end?.toLocaleString()}</p>`

            // Descricao
            if (info.event.extendedProps.descricao) {
                html += `<p><strong>Descrição:</strong> ${info.event.extendedProps.descricao}</p>`
            }

            // Tags
            if (info.event.extendedProps.tags) {
                html += `<p><strong>Tags:</strong> ${info.event.extendedProps.tags.map(tag => tag.nome).join(", ")}</p>`
            }
        } else {
            html += `<p>Feriado.</p>`
            html += `<p><strong>Data:</strong> ${info.event.start?.toLocaleString()}</p>`
        }

        Swal.fire({
            title: info.event.title,
            html: html
        })
    }

    return (
        <Container>
            <div className={"row"}>
                <div className="col-12 mb-3">
                    <div className="card h-100">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-0">Calendário de Atividades</h6>
                        </div>
                        <div className="card-body p-3">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                                initialView={currentView}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                editable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                events={events}
                                locale={ptLocale}
                                eventClick={handleEventClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}