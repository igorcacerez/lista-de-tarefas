import * as React from 'react'
import {Link, useLocation} from "react-router-dom";

export function Breadcrumb() {

    // Pega a url atual da página com react-router-dom
    const location = useLocation();

    // Verifica em qual página o usuário está e retorna o breadcrumb correspondente
    const pages = {
        "/": "Painel Administrativo",
        "/perfil": "Perfil",
        "/calendario": "Calendário de Atividades",
        "/atividades": "Atividades",
        "/tags": "Tags"
    }

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                {location.pathname !== "/" && (
                    <li className="breadcrumb-item text-sm">
                        <Link to={"/"} className="opacity-5 text-dark">Painel</Link>
                    </li>
                )}
                <li className="breadcrumb-item text-sm text-dark active" >{pages[location.pathname] || "Página Atual"}</li>
            </ol>
        </nav>
    )
}