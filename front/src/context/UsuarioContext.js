import {createContext, useState} from "react";

const UsuarioContext = createContext();

const UsuarioProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);

    return (
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export {UsuarioContext, UsuarioProvider}