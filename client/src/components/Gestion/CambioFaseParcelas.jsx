import React, { useState, useContext } from 'react';
import { ParcelasContext } from './ParcelasContext';
import { EjerciciosContext } from '../Registro/EjerciciosContext';
import './Gestion.css'; // Asegúrate de que este archivo incluya tus estilos CSS

const CambioFaseParcelas = ({ cerrarModal }) => {
    const { parcelas, cambiarFaseParcela } = useContext(ParcelasContext);
    const { cambiarFaseParcela: cambiarFaseEjercicio } = useContext(EjerciciosContext);
    const [parcelasSeleccionadas, setParcelasSeleccionadas] = useState([]);

    const fases = ['Preparación', 'Siembra y Cuidados', 'Cosecha', 'Comercialización'];

    const handleConfirmar = () => {
        parcelasSeleccionadas.forEach(parcelaId => {
            const parcela = parcelas.find(p => p.id === parcelaId);
            const faseActualIndex = fases.indexOf(parcela.fase);
            const nuevaFase = fases[(faseActualIndex + 1) % fases.length];
            
            cambiarFaseParcela(parcelaId, nuevaFase);
            cambiarFaseEjercicio(parcelaId, nuevaFase);
        });
        cerrarModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="modal-title">Cambio de Fase de Parcelas</h2>
                <div className="form-group">
                    <label>Seleccionar Parcelas:</label>
                    <div className="checkbox-group">
                        {parcelas.map(parcela => (
                            <label key={parcela.id} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value={parcela.id}
                                    checked={parcelasSeleccionadas.includes(parcela.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setParcelasSeleccionadas([...parcelasSeleccionadas, parcela.id]);
                                        } else {
                                            setParcelasSeleccionadas(parcelasSeleccionadas.filter(id => id !== parcela.id));
                                        }
                                    }}
                                />
                                {parcela.nombre} - Fase actual: {parcela.fase}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="button-group">
                    <button className="modal-button cancel-button" onClick={cerrarModal}>Cancelar</button>
                    <button className="modal-button" onClick={handleConfirmar} disabled={parcelasSeleccionadas.length === 0}>
                        Confirmar Cambio de Fase
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CambioFaseParcelas;
