import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [properties, setProperties] = useState([]); //Para manejar las propiedades inmobiliarias

    //Funcion para iniciar Sesion y guardar usuario y token
    const login = (userData, tokenValue) => {
        setUser(userData);
        setToken(tokenValue);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

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