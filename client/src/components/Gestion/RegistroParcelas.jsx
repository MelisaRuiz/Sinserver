import React, { useState, useContext } from 'react';
import { ParcelasContext } from './ParcelasContext';
import { EjerciciosContext } from '../Registro/EjerciciosContext';
import './Gestion.css';

const RegistroParcelas = ({ onClose, coordenadas }) => {
    const { agregarParcela } = useContext(ParcelasContext);
    const { crearNuevoEjercicio } = useContext(EjerciciosContext);
    const [nuevaParcela, setNuevaParcela] = useState({
        nombre: '',
        area: '',
        tipoCultivo: '',
        fase: 'Preparación',
        coordenadas: coordenadas
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaParcela(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parcelaCreada = {
            ...nuevaParcela,
            id: Date.now().toString(),
            area: parseFloat(nuevaParcela.area),
            coordenadas: coordenadas.map(coord => ({lat: coord.lat, lng: coord.lng})) // Asegúrate de que esto esté correcto
        };
        agregarParcela(parcelaCreada);
        if (parcelaCreada.fase === 'Preparación') {
            crearNuevoEjercicio();
        }
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Registrar Nueva Parcela</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        value={nuevaParcela.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la parcela"
                        required
                    />
                    <input
                        type="number"
                        name="area"
                        value={nuevaParcela.area}
                        onChange={handleChange}
                        placeholder="Área en hectáreas"
                        required
                    />
                    <input
                        type="text"
                        name="tipoCultivo"
                        value={nuevaParcela.tipoCultivo}
                        onChange={handleChange}
                        placeholder="Tipo de cultivo"
                        required
                    />
                    <select
                        name="fase"
                        value={nuevaParcela.fase}
                        onChange={handleChange}
                        required
                    >
                        <option value="Preparación">Preparación</option>
                        <option value="Siembra y Cuidados">Siembra y Cuidados</option>
                        <option value="Cosecha">Cosecha</option>
                        <option value="Comercialización">Comercialización</option>
                    </select>
                    <button type="submit">Registrar Parcela</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroParcelas;
