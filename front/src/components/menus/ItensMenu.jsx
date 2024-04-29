import {Icons} from "../../adapters/Icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {handleLogout} from "../../handles/usuario/handleLogout";

export function ItensMenu({link = null, icon, texto}) {
    const location = useLocation()
    const navigate = useNavigate()

    if (!link) {
        return (
            <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">{texto}</h6>
            </li>
        )
    }

    return (
        <li className="nav-item">
            {link === "/logout" ? (
                <div className={"nav-link cursor-pointer"} onClick={() => handleLogout(navigate)}>
                    <div
                        className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                        <Icons icon={icon} color={"#3A416F"} />
                    </div>
                    <span className="nav-link-text ms-1">{texto}</span>
                </div>
            ) : (
            <Link to={link} className={"nav-link " + (location.pathname === link ? "active" : "")}>
                <div
                    className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <Icons icon={icon} color={(location.pathname === link ? "#fff" : "#3A416F") }/>
                    </div>
                    <span className="nav-link-text ms-1">{texto}</span>
                </Link>
            )}
        </li>
    )
}