import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const ParcelasContext = createContext();

// Hook para usar el contexto
export const useParcelas = () => useContext(ParcelasContext);

// Proveedor del contexto
export const ParcelasProvider = ({ children }) => {
    const [parcelas, setParcelas] = useState([]);

    const agregarParcela = (nuevaParcela) => {
        setParcelas(prevParcelas => [...prevParcelas, nuevaParcela]);
    };

    const eliminarParcela = (id) => {
        setParcelas(prevParcelas => prevParcelas.filter(parcela => parcela.id !== id));
    };

    const editarParcela = (id, datosActualizados) => {
        setParcelas(prevParcelas => prevParcelas.map(parcela => 
            parcela.id === id ? { ...parcela, ...datosActualizados } : parcela
        ));
    };

    const cambiarFaseParcela = (id, nuevaFase) => {
        setParcelas(prevParcelas => prevParcelas.map(parcela => 
            parcela.id === id ? { ...parcela, fase: nuevaFase } : parcela
        ));
    };

    return (
        <ParcelasContext.Provider value={{ 
            parcelas, 
            agregarParcela, 
            eliminarParcela, 
            editarParcela,
            cambiarFaseParcela
        }}>
            {children}
        </ParcelasContext.Provider>
    );
};
