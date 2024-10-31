import React, { useState, useContext, useEffect } from 'react';
import './Registro.css';
import ModalPreview from './ModalPreview';
import ExportarEjercicio from './ExportarEjercicio';
import { EjerciciosContext } from './EjerciciosContext';
import { ParcelasContext } from '../Gestion/ParcelasContext'; // Asegúrate de que la ruta sea correcta
import { calcularBalancePorEtapaYCultivo, calcularEstadoResultadosDetalladoPorCultivo, calcularFlujoEfectivoPorEtapaYCultivo } from './Calculos';
import Dashboard from '../Dashboard/Dashboard'; // Importa el componente Dashboard

const Registro = () => {
    const { movimientos, ejercicios } = useContext(EjerciciosContext);
    const { parcelas } = useContext(ParcelasContext); // Obtén parcelas del contexto

    const [mostrarModalPreview, setMostrarModalPreview] = useState(false);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [datosCalculados, setDatosCalculados] = useState(null);
    const [vistaPreview, setVistaPreview] = useState('balance');
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Movimientos actualizados:", movimientos);
        console.log("Ejercicios actualizados:", ejercicios);
    }, [movimientos, ejercicios]);

    const handleEjercicioClick = (ejercicioId) => {
        try {
            setError(null);
            setEjercicioSeleccionado(ejercicioId);
            console.log("Ejercicio seleccionado:", ejercicioId);
            console.log("Todos los movimientos:", movimientos);
            const movimientosEjercicio = movimientos[ejercicioId] || [];
            console.log("Movimientos del ejercicio:", movimientosEjercicio);
            
            if (movimientosEjercicio.length === 0) {
                console.log("No hay movimientos para este ejercicio");
                setDatosCalculados(null);
                setMostrarModalPreview(true);
                return;
            }

            const balance = calcularBalancePorEtapaYCultivo(movimientosEjercicio);
            const estadoResultados = calcularEstadoResultadosDetalladoPorCultivo(movimientosEjercicio);
            const flujoEfectivo = calcularFlujoEfectivoPorEtapaYCultivo(movimientosEjercicio);
            
            console.log("Balance calculado:", balance);
            console.log("Estado de resultados calculado:", estadoResultados);
            console.log("Flujo de efectivo calculado:", flujoEfectivo);
            
            setDatosCalculados({ balance, estadoResultados, flujoEfectivo });
            setMostrarModalPreview(true);
        } catch (err) {
            console.error("Error al procesar el ejercicio:", err);
            setError(`Error al procesar el ejercicio: ${err.message}`);
        }
    };

    return (
        <div className="main-content">
            {error && <div className="error-message">{error}</div>}
            <div className="top-row">
                <div className="sidebare">
                    <h3>Ejercicios</h3>
                    <div className="ejercicios">
                        {Object.entries(ejercicios).map(([ejercicioId, ejercicioData]) => (
                            <div key={ejercicioId} className={`${ejercicioId} ${ejercicioData.estado}`}>
                                <span onClick={() => handleEjercicioClick(ejercicioId)}>
                                    {ejercicioId} - {ejercicioData.estado}
                                </span>
                                <ExportarEjercicio 
                                    ejercicio={ejercicioId}
                                    movimientosEjercicio={movimientos[ejercicioId] || []}
                                    datosEjercicio={ejercicioData}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sidebare">
                    <h3>Informes</h3>
                    {/* Aquí puedes agregar opciones para generar informes específicos */}
                </div>
                <div className="sidebare">
                    <h3>Inventario</h3>
                    {/* Aquí puedes agregar opciones para generar informes específicos */}
                </div>
            </div>
            
            <div className="container-grafics">
                <Dashboard 
                    ejercicios={ejercicios} 
                    movimientos={movimientos} 
                    parcelas={parcelas} 
                />
            </div>

            {mostrarModalPreview && ejercicioSeleccionado && (
                <ModalPreview 
                    datos={datosCalculados}
                    onClose={() => setMostrarModalPreview(false)}
                />
            )}
        </div>
    );
};

export default Registro;
