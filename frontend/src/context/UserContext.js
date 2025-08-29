import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]); // Para manejar las propiedades inmobiliarias

    return (
        <UserContext.Provider value={{
            user, 
            setUser,
            properties,
            setProperties
        }}>
            {children}
        </UserContext.Provider>
    );
};