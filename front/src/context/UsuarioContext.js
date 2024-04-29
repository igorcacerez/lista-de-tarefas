import {createContext, useEffect, useState} from "react";
import {getUserLocal} from "../service/usuario.service";

const UsuarioContext = createContext();

const UsuarioProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const user = await getUserLocal();
                setUsuario(user);
            } catch (error) {
                console.error("Erro ao buscar usuário: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsuario()
    }, []);

    const salvarUsuario = (usuario) => setUsuario(usuario);

    const getUsuario = () => usuario;

    return (
        <UsuarioContext.Provider value={{getUsuario, salvarUsuario, loading }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export {UsuarioContext, UsuarioProvider}