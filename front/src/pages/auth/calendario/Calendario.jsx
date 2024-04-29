import {Container} from "../../../components/ui/Container";
import {useEffect, useState} from "react";
import {getAtividades} from "../../../service/atividade.service";
import {buscarFeriados} from "../../../service/feriados.service";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'; // Para visualização em lista
import ptLocale from '@fullcalendar/core/locales/pt';
import {AlertDetails} from "../../../adapters/alert";
import {Card} from "../../../components/cards/Card";

export function Calendario() {
    const [currentView, setCurrentView] = useState('dayGridMonth');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function buscarAtividades() {
            const atividades = await getAtividades()
            const feriados = await buscarFeriados()

            console.log(atividades)
            console.log(feriados)

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
                    start: new Date(feriado.date + "T00:00:00"),
                    end: new Date(feriado.date + "T23:59:59"),
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

        let titulo = info.event.title
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

        AlertDetails(titulo, html)
    }

    return (
        <Container>
            <Card>
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
            </Card>
        </Container>
    )
}