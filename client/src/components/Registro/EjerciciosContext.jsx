import React, { createContext, useContext, useState, useEffect } from 'react';
import { ParcelasContext } from '../Gestion/ParcelasContext';

// Cambiamos esta línea para exportar el contexto directamente
export const EjerciciosContext = createContext();

export const useEjercicios = () => useContext(EjerciciosContext);

export const EjerciciosProvider = ({ children }) => {
    const [movimientos, setMovimientos] = useState({});
    const [ejercicios, setEjercicios] = useState({});
    const [ultimoNumeroEjercicio, setUltimoNumeroEjercicio] = useState(0);
    const { parcelas } = useContext(ParcelasContext);

    useEffect(() => {
        if (parcelas.length > 0 && Object.keys(ejercicios).length === 0) {
            crearNuevoEjercicio(parcelas.map(p => p.id));
        }
    }, [parcelas]);

    const crearNuevoEjercicio = (parcelasIds) => {
        const nuevoNumero = ultimoNumeroEjercicio + 1;
        const nuevoId = `Ejercicio_${nuevoNumero}`;
        setUltimoNumeroEjercicio(nuevoNumero);
        setEjercicios(prev => ({
            ...prev,
            [nuevoId]: {
                id: nuevoId,
                numero: nuevoNumero,
                fechaInicio: new Date().toISOString(),
                estado: 'En Proceso',
                movimientos: [],
                parcelas: parcelasIds,
            },
        }));
        console.log('Nuevo ejercicio creado:', nuevoId);
        return nuevoId;
    };

    const agregarTransaccion = (nuevaTransaccion) => {
        const ejercicioAsociado = encontrarEjercicioParaParcela(nuevaTransaccion.parcelaId);
        if (!ejercicioAsociado) {
            throw new Error("No se encontró un ejercicio asociado para esta parcela.");
        }

        setMovimientos(prev => ({
            ...prev,
            [ejercicioAsociado]: [
                ...(prev[ejercicioAsociado] || []),
                nuevaTransaccion,
            ],
        }));

        console.log('Transacción agregada:', nuevaTransaccion);
        console.log('Movimientos actualizados:', movimientos);
    };

    const encontrarEjercicioParaParcela = (parcelaId) => {
        return Object.entries(ejercicios).find(([_, ej]) => 
            ej.estado === 'En Proceso' && ej.parcelas.includes(parcelaId)
        )?.[0];
    };

    const finalizarEjercicioParaParcela = (parcelaId) => {
        const ejercicioActual = encontrarEjercicioParaParcela(parcelaId);
        if (ejercicioActual) {
            setEjercicios(prev => {
                const ejercicioActualizado = {...prev[ejercicioActual]};
                ejercicioActualizado.parcelas = ejercicioActualizado.parcelas.filter(id => id !== parcelaId);
                
                if (ejercicioActualizado.parcelas.length === 0) {
                    ejercicioActualizado.estado = 'Finalizado';
                    ejercicioActualizado.fechaFin = new Date().toISOString();
                }
                
                return {...prev, [ejercicioActual]: ejercicioActualizado};
            });
        }
    };

    const cambiarFaseParcela = (parcelaId, nuevaFase) => {
        if (nuevaFase === 'Preparación') {
            finalizarEjercicioParaParcela(parcelaId);
            
            // Buscar el ejercicio más reciente en proceso
            const ejercicioMasReciente = Object.values(ejercicios)
                .filter(ej => ej.estado === 'En Proceso')
                .sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))[0];

            if (ejercicioMasReciente) {
                // Agregar la parcela al ejercicio más reciente
                setEjercicios(prev => ({
                    ...prev,
                    [ejercicioMasReciente.id]: {
                        ...prev[ejercicioMasReciente.id],
                        parcelas: [...prev[ejercicioMasReciente.id].parcelas, parcelaId],
                    },
                }));
            } else {
                // Si no hay ejercicios en proceso, crear uno nuevo
                crearNuevoEjercicio([parcelaId]);
            }
        }
    };

    return (
        <EjerciciosContext.Provider
            value={{
                movimientos,
                ejercicios,
                agregarTransaccion,
                crearNuevoEjercicio,
                finalizarEjercicioParaParcela,
                cambiarFaseParcela,
                encontrarEjercicioParaParcela,
            }}
        >
            {children}
        </EjerciciosContext.Provider>
    );
};
