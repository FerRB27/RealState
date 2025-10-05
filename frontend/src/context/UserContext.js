import React, { createContext, useState } from 'react';

// Este contexto nos ayuda a compartir la información del usuario en toda la app
export const UserContext = createContext();

// UserProvider es el "envoltorio" que guarda los datos del usuario y si está logueado
export const UserProvider = ({children}) => {
    // Aquí guardamos el usuario actual
    const [user, setUser] = useState(null);
    // Aquí guardamos el token que nos da el backend cuando iniciamos sesión
    const [token, setToken] = useState(null);
    // Aquí guardamos las propiedades inmobiliarias (puedes usarlo para tu lista de casas, etc)
    const [properties, setProperties] = useState([]);

    // Esta función se llama cuando el usuario inicia sesión correctamente
    const login = (userData, tokenValue) => {
        setUser(userData); // Guardamos el usuario
        setToken(tokenValue); // Guardamos el token
    };

    // Esta función se llama cuando el usuario quiere salir de la app
    const logout = () => {
        setUser(null); // Borramos el usuario
        setToken(null); // Borramos el token
    };

    // Compartimos toda esta información con el resto de la app
    return (
        <UserContext.Provider value={{
            user, 
            setUser,
            token,
            login,
            logout,
            properties,
            setProperties
        }}>
            {children}
        </UserContext.Provider>
    );
};