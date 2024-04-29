import {logout} from "../../service/usuario.service";

export const handleLogout = (navigate) => {
    logout()
        .then(() => navigate('/login'));
}