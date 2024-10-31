import React, { useState } from 'react';
import { useEquipo } from './EquipoContext';

const RegistroMaquinaria = ({ onClose }) => {
    const { agregarMaquinaria } = useEquipo();
    const [nuevaMaquinaria, setNuevaMaquinaria] = useState({
        nombre: '',
        tipo: '',
        valorInicial: '',
        depreciacionAnual: '',
        fechaAdquisicion: '',
        esCredito: false,
        montoCredito: '',
        plazoCredito: '',
        tasaInteres: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNuevaMaquinaria(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarMaquinaria({
            ...nuevaMaquinaria,
            id: Date.now().toString(),
            valorInicial: parseFloat(nuevaMaquinaria.valorInicial),
            depreciacionAnual: parseFloat(nuevaMaquinaria.depreciacionAnual),
            montoCredito: nuevaMaquinaria.esCredito ? parseFloat(nuevaMaquinaria.montoCredito) : null,
            plazoCredito: nuevaMaquinaria.esCredito ? parseInt(nuevaMaquinaria.plazoCredito) : null,
            tasaInteres: nuevaMaquinaria.esCredito ? parseFloat(nuevaMaquinaria.tasaInteres) : null,
        });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Registrar Nueva Maquinaria</h2>
                <form onSubmit={handleSubmit}>
                    {/* Aquí van los campos del formulario, similar a tu versión original */}
                    <button type="submit">Registrar Maquinaria</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroMaquinaria;
