import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {UsuarioContext} from "../context/UsuarioContext";

export const RotaPrivada = ({  component: Component, ...rest }) => {
    const {getUsuario, loading } = useContext(UsuarioContext)
    let usuario = getUsuario()

    if (loading) return <div></div>

    if (!usuario) return <Navigate to="/login" />;

    return <Component {...rest} />;
};