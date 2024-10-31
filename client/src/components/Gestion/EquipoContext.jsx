import React, { createContext, useContext, useState } from 'react';

const EquipoContext = createContext();

export const useEquipo = () => useContext(EquipoContext);

export const EquipoProvider = ({ children }) => {
    const [maquinarias, setMaquinarias] = useState([]);
    const [productores, setProductores] = useState([]);

    const agregarMaquinaria = (nuevaMaquinaria) => {
        setMaquinarias(prev => [...prev, nuevaMaquinaria]);
    };

    const agregarProductor = (nuevoProductor) => {
        setProductores(prev => [...prev, nuevoProductor]);
    };

    return (
        <EquipoContext.Provider value={{ 
            maquinarias, 
            productores, 
            agregarMaquinaria, 
            agregarProductor 
        }}>
            {children}
        </EquipoContext.Provider>
    );
};
