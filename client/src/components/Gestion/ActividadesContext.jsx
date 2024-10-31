import React, { createContext, useState } from 'react';

export const ActividadesContext = createContext();

export const ActividadesProvider = ({ children }) => {
  const [actividades, setActividades] = useState([]);

  const agregarActividad = (nuevaActividad) => {
    setActividades(prev => [...prev, nuevaActividad]);
  };

  return (
    <ActividadesContext.Provider value={{ actividades, agregarActividad }}>
      {children}
    </ActividadesContext.Provider>
  );
};
