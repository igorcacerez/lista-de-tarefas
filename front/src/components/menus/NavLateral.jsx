import {Icons} from "../../adapters/Icons";
import {Link} from "react-router-dom";
import {ItensMenu} from "./ItensMenu";

export function NavLateral({abrirFecharMenu}) {
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y bg-white" id="sidenav-main">
            <div className="sidenav-header">
                <Icons icon={"faXmark"} className={"btn-fecha-menu cursor-pointer"} onClick={abrirFecharMenu} />
                <Link to={"/"} className="navbar-brand m-0">
                    <h5 className="font-weight-bolder text-info text-gradient">Lista de Tarefas</h5>
                </Link>
            </div>

            <hr className="horizontal dark mt-0"/>

            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">

                    <ItensMenu
                        link={"/"}
                        icon={"faChartSimple"}
                        texto={"Dashboard"}
                    />

                    <ItensMenu texto={"Gerenciamento"} />

                    <ItensMenu
                        link={"/atividades"}
                        icon={"faListCheck"}
                        texto={"Atividades"}
                    />

                    <ItensMenu
                        link={"/tags"}
                        icon={"faTags"}
                        texto={"Tags"}
                    />

                    <ItensMenu
                        link={"/calendario"}
                        icon={"faCalendarDays"}
                        texto={"Calendário"}
                    />

                    <ItensMenu
                        link={"/perfil"}
                        icon={"faGear"}
                        texto={"Configurações"}
                    />

                    <ItensMenu
                        link={"/logout"}
                        icon={"faRightFromBracket"}
                        texto={"Sair"}
                    />
                </ul>
            </div>
        </aside>
    )
}