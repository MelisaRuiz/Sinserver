import React, { useState, useContext } from 'react';
import { ActividadesContext } from './ActividadesContext';
import { EjerciciosContext } from '../Registro/EjerciciosContext';
import { ParcelasContext } from './ParcelasContext';
import './Gestion.css'; // Asegúrate de que este archivo incluya tus estilos CSS

const ModalActividad = ({ onClose }) => {
    const { agregarActividad } = useContext(ActividadesContext);
    const { agregarTransaccion } = useContext(EjerciciosContext);
    const { parcelas } = useContext(ParcelasContext);
    const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState([]);
    const [nuevaActividad, setNuevaActividad] = useState({
        tipo: '',
        fecha: '',
        descripcion: '',
        costo: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaActividad(prev => ({
            ...prev,
            [name]: name === 'costo' ? parseInt(value.replace(/\D/g, ''), 10) || 0 : value
        }));
    };

    const handleParcelaChange = (e) => {
        const parcelaId = e.target.value;
        setParcelasSeleccionadas(prev => 
            prev.includes(parcelaId) 
                ? prev.filter(id => id !== parcelaId)
                : [...prev, parcelaId]
        );
    };

    const todasMismaFase = () => {
        if (parcelasSeleccionadas.length === 0) return false;
        const fase = parcelas.find(p => p.id === parcelasSeleccionadas[0]).fase;
        return parcelasSeleccionadas.every(id => 
            parcelas.find(p => p.id === id).fase === fase
        );
    };

    const getFaseActual = () => {
        if (parcelasSeleccionadas.length === 0) return null;
        return parcelas.find(p => p.id === parcelasSeleccionadas[0]).fase;
    };

    const actividadesPermitidas = {
        'Preparación': ['Limpieza', 'Arado', 'Fertilización inicial'],
        'Siembra y Cuidados': ['Siembra', 'Riego', 'Fertilización', 'Control de plagas'],
        'Cosecha': ['Cosecha', 'Almacenamiento'],
        'Comercialización': ['Venta', 'Transporte']
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todasMismaFase()) {
            alert('Todas las parcelas seleccionadas deben estar en la misma fase.');
            return;
        }

        const fase = getFaseActual();
        if (!fase || !actividadesPermitidas[fase].includes(nuevaActividad.tipo)) {
            alert(`La actividad ${nuevaActividad.tipo} no está permitida en la fase ${fase}`);
            return;
        }

        parcelasSeleccionadas.forEach(parcelaId => {
            const actividad = {
                ...nuevaActividad,
                id: Date.now().toString() + parcelaId,
                parcelaId: parcelaId,
                fase: fase
            };
            agregarActividad(actividad);

            const parcela = parcelas.find(p => p.id === parcelaId);
            const transaccion = {
                ...nuevaActividad,
                parcelas: [{ id: parcelaId, fase: fase, cultivo: parcela.cultivo }],
                parcelaId: parcelaId,
                monto: parseFloat(nuevaActividad.costo),
                tipoMovimiento: 'Egresos',
                categoria: nuevaActividad.tipo,
                etapa: fase,
                fecha: nuevaActividad.fecha,
                cultivo: parcela.cultivo
            };
            agregarTransaccion(transaccion);
        });

        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-title">Registrar Actividad</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Seleccionar Parcelas:</label>
                        <div className="checkbox-group">
                            {parcelas.map(parcela => (
                                <label key={parcela.id} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        value={parcela.id}
                                        checked={parcelasSeleccionadas.includes(parcela.id)}
                                        onChange={handleParcelaChange}
                                    />
                                    {parcela.nombre} - Fase: {parcela.fase}
                                </label>
                            ))}
                        </div>
                    </div>
                    {todasMismaFase() && (
                        <select
                            className="modal-select"
                            name="tipo"
                            value={nuevaActividad.tipo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione el tipo de actividad</option>
                            {actividadesPermitidas[getFaseActual()].map(actividad => (
                                <option key={actividad} value={actividad}>{actividad}</option>
                            ))}
                        </select>
                    )}
                    {nuevaActividad.tipo && (
                        <>
                            <input
                                className="modal-input"
                                type="date"
                                name="fecha"
                                value={nuevaActividad.fecha}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                className="modal-input"
                                name="descripcion"
                                value={nuevaActividad.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción de la actividad"
                                required
                            />
                            <input
                                className="modal-input"
                                type="text"
                                name="costo"
                                value={nuevaActividad.costo.toLocaleString('es-PY')}
                                onChange={handleChange}
                                placeholder="Costo de la actividad en Gs."
                                required
                            />
                        </>
                    )}
                    <div className="button-group">
                        <button
                            type="submit"
                            className="modal-button"
                            disabled={!todasMismaFase() || parcelasSeleccionadas.length === 0 || !nuevaActividad.tipo}>
                            Guardar Actividad
                        </button>
                        <button type="button" className="modal-button cancel-button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalActividad;
