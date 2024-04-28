import {Icons} from "../../adapters/Icons";
import {Link} from "react-router-dom";
import {Breadcrumb} from "./Breadcrumb";

export function NavTopo({abrirFecharMenu}) {
    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3">
                <Breadcrumb />

                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item d-flex align-items-center">
                            <Link to={"/perfil"} className="nav-link text-body font-weight-bold px-0">
                                <Icons icon={"faUser"} className={"me-sm-1"} />
                                <span className="d-sm-inline d-none">Olá, Igor</span>
                            </Link>
                        </li>

                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <div className="nav-link text-body p-0 cursor-pointer" onClick={abrirFecharMenu}>
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}