import {createContext, useState} from "react";

const LayoutContext = createContext();

const LayoutProvider = ({children}) => {
    const [menuAberto, setMenuAberto] = useState(false);

    const abrirFecharMenu = () => setMenuAberto(!menuAberto);

    return (
        <LayoutContext.Provider value={{menuAberto, abrirFecharMenu}}>
            {children}
        </LayoutContext.Provider>
    )
}

export {LayoutContext, LayoutProvider}