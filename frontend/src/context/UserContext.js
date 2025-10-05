import React, { createContext, useState } from 'react';
// No es necesario importar funciones de la base de datos aquí

// Este contexto nos ayuda a compartir la información del usuario en toda la app
export const UserContext = createContext();

// UserProvider es el "envoltorio" que guarda los datos del usuario y si está logueado
export const UserProvider = ({children}) => {
    // Estado de usuario y token
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Funciones de login y logout
    const login = (userData, tokenValue) => {
        setUser(userData);
        setToken(tokenValue);
    };
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    // Solo compartimos la sesión y usuario
    return (
        <UserContext.Provider value={{
            user,
            setUser,
            token,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
};