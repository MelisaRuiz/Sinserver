import React, { useState, useContext } from 'react';
import Mapa from './Mapa';
import RegistroParcelas from './RegistroParcelas';
import ModalActividad from './ModalActividad';
import CambioFaseParcelas from './CambioFaseParcelas';
import Equipo from './Equipo';
import { ParcelasContext } from './ParcelasContext';
import { ActividadesContext } from './ActividadesContext';
import './Gestion.css';


const Gestion = () => {
    const [mostrarRegistroParcelas, setMostrarRegistroParcelas] = useState(false);
    const [mostrarModalActividad, setMostrarModalActividad] = useState(false);
    const [mostrarCambioFase, setMostrarCambioFase] = useState(false);
    const [parcelaSeleccionada, setParcelaSeleccionada] = useState(null);
    const [areaSeleccionada, setAreaSeleccionada] = useState(null);
    const { parcelas } = useContext(ParcelasContext);
    const { actividades } = useContext(ActividadesContext);

    const handleParcelaSeleccionada = (id) => {
        setParcelaSeleccionada(id);
    };

    const handleNuevaParcelaCreada = (coordenadas) => {
        setAreaSeleccionada(coordenadas);
        setMostrarRegistroParcelas(true);
    };

    return (
        <div className="parcela">
            <div className="top">
                <div className="regi">
                    <h3>Parcelas</h3>
                    {parcelas.length === 0 && (
                        <p className="aviso-parcelas">Seleccione un área en el mapa para registrar una nueva parcela.</p>
                    )}
                    {parcelas.length > 0 && (
                        <>
                            <ul>
                                {parcelas.map(parcela => (
                                    <li key={parcela.id} className={parcela.id === parcelaSeleccionada ? 'selected' : ''}>
                                        {parcela.nombre} - {parcela.area} hectáreas - {parcela.tipoCultivo} - Fase: {parcela.fase}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <div className="sidebaredos">
                    <h3>Actividades</h3>
                    {parcelas.length > 0 && (
                        <button onClick={() => setMostrarCambioFase(true)}>
                            Cambiar Fase
                        </button>
                    )}
                    {parcelas.length > 0 ? (
                        <>
                            <button onClick={() => setMostrarModalActividad(true)}>Registrar Nueva Actividad</button>
                            {actividades.length > 0 && (
                                <div className="tabla-actividades">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Fecha</th>
                                                <th>Parcela</th>
                                                <th>Costo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actividades.map(actividad => (
                                                <tr key={actividad.id}>
                                                    <td>{actividad.tipo}</td>
                                                    <td>{new Date(actividad.fecha).toLocaleDateString()}</td>
                                                    <td>{parcelas.find(p => p.id === actividad.parcelaId)?.nombre}</td>
                                                    <td>{typeof actividad.costo === 'number' ? actividad.costo.toLocaleString('es-PY') : '0'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="aviso-actividades">No se pueden agregar actividades hasta que se registren parcelas.</p>
                    )}
                </div>
                <div className="sidebaretres">
                    <Equipo />
                </div>
            </div>
            <div className="grafics">
                <Mapa 
                    onParcelaSeleccionada={handleParcelaSeleccionada}
                    onNuevaParcelaCreada={handleNuevaParcelaCreada}
                    parcelas={parcelas}
                />
            </div>
            <div className="actividad">

            {mostrarRegistroParcelas && areaSeleccionada && (
                <RegistroParcelas 
                    onClose={() => {
                        setMostrarRegistroParcelas(false);
                        setAreaSeleccionada(null);
                    }} 
                    coordenadas={areaSeleccionada}
                />
            )}
            {mostrarModalActividad && (
                <ModalActividad 
                    onClose={() => setMostrarModalActividad(false)}
                    parcelas={parcelas}
                />
            )}
            {mostrarCambioFase && (
                <CambioFaseParcelas 
                    cerrarModal={() => setMostrarCambioFase(false)}
                />
            )}
            
            </div>
        </div>
    );
};

export default Gestion;
