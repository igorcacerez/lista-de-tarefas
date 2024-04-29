import {Footer} from "../footer/Footer";
import {NavTopo} from "../menus/NavTopo";
import {NavLateral} from "../menus/NavLateral";
import {useContext} from "react";
import {LayoutContext} from "../../context/LayoutContext";

export function Container({login = false, children}) {
    const {menuAberto, abrirFecharMenu} = useContext(LayoutContext);

    if(login) {
        return (
            <main className="main-content mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    let classeMenu = "g-sidenav-show bg-gray-100 min-height-vh-100"
    classeMenu += menuAberto ? " g-sidenav-pinned" : "";

    return (
        <div className={classeMenu}>
            <NavLateral abrirFecharMenu={abrirFecharMenu} />

            <main className="main-content position-relative h-100 border-radius-lg ">
                <NavTopo abrirFecharMenu={abrirFecharMenu} />

                <div className="container-fluid py-4">
                    {children}
                    <Footer/>
                </div>
            </main>
        </div>
    )
}