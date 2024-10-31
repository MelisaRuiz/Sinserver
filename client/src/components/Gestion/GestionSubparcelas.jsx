import React, { useState } from 'react';
import { useParcelas } from './ParcelasContext';

const GestionSubparcelas = ({ parcelaId, onClose }) => {
  const { parcelas, agregarSubparcela, actualizarSubparcela } = useParcelas();
  const [nuevaSubparcela, setNuevaSubparcela] = useState({ nombre: '', area: '', cultivoActual: '' });

  const parcela = parcelas.find(p => p.id === parcelaId);

  if (!parcela) {
    return <div>Parcela no encontrada</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaSubparcela(prev => ({ ...prev, [name]: value }));
  };

  const handleAgregarSubparcela = () => {
    agregarSubparcela(parcelaId, { ...nuevaSubparcela, id: Date.now().toString(), fase: 'Preparación' });
    setNuevaSubparcela({ nombre: '', area: '', cultivoActual: '' });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Gestión de Subparcelas para {parcela.nombre}</h2>
        
        <div>
          <h3>Agregar Nueva Subparcela</h3>
          <input
            type="text"
            name="nombre"
            value={nuevaSubparcela.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="number"
            name="area"
            value={nuevaSubparcela.area}
            onChange={handleChange}
            placeholder="Área"
          />
          <input
            type="text"
            name="cultivoActual"
            value={nuevaSubparcela.cultivoActual}
            onChange={handleChange}
            placeholder="Cultivo Actual"
          />
          <button onClick={handleAgregarSubparcela}>Agregar Subparcela</button>
        </div>

        <div>
          <h3>Subparcelas Actuales</h3>
          {parcela.subparcelas && parcela.subparcelas.map(sp => (
            <div key={sp.id}>
              <h4>{sp.nombre}</h4>
              <p>Área: {sp.area}</p>
              <p>Cultivo Actual: {sp.cultivoActual}</p>
              <p>Fase: {sp.fase}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default GestionSubparcelas;
