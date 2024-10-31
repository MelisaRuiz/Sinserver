import React, { useState } from 'react';
import { useEquipo } from './EquipoContext';

const RegistroProductor = ({ onClose }) => {
    const { agregarProductor } = useEquipo();
    const [nuevoProductor, setNuevoProductor] = useState({
        nombre: '',
        cargo: '',
        sueldo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoProductor(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarProductor({
            ...nuevoProductor,
            id: Date.now().toString(),
            sueldo: parseFloat(nuevoProductor.sueldo)
        });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Registrar Nuevo Productor</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        value={nuevoProductor.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del productor"
                        required
                    />
                    <input
                        type="text"
                        name="cargo"
                        value={nuevoProductor.cargo}
                        onChange={handleChange}
                        placeholder="Cargo"
                        required
                    />
                    <input
                        type="number"
                        name="sueldo"
                        value={nuevoProductor.sueldo}
                        onChange={handleChange}
                        placeholder="Sueldo"
                        required
                    />
                    <button type="submit">Registrar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroProductor;
