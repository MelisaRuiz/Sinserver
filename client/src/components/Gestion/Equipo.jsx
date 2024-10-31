import React, { useState } from 'react';
import { useEquipo } from './EquipoContext';
import RegistroMaquinaria from './RegistroMaquinaria';
import RegistroProductor from './RegistroProductor';

const Equipo = () => {
    const { maquinarias, productores } = useEquipo();
    const [mostrarRegistroMaquinaria, setMostrarRegistroMaquinaria] = useState(false);
    const [mostrarRegistroProductor, setMostrarRegistroProductor] = useState(false);

    return (
        <div className="equipo">
            <h3>Equipo</h3>
            
            <div className="maquinarias">
                <button onClick={() => setMostrarRegistroMaquinaria(true)}>Registrar Nueva Maquinaria</button>
                {maquinarias.map(maquinaria => (
                    <div key={maquinaria.id}>
                        <h4>{maquinaria.nombre}</h4>
                        <p>Tipo: {maquinaria.tipo}</p>
                        <p>Estado: {maquinaria.esCredito ? 'En crédito' : 'Pagada'}</p>
                        {maquinaria.esCredito && <p>Cuotas restantes: {maquinaria.cuotasRestantes}</p>}
                    </div>
                ))}
            </div>

            <div className="productores">
                <button onClick={() => setMostrarRegistroProductor(true)}>Registrar Nuevo Productor</button>
                {productores.map(productor => (
                    <div key={productor.id}>
                        <h4>{productor.nombre}</h4>
                        <p>Cargo: {productor.cargo}</p>
                        <p>Sueldo: ${productor.sueldo}</p>
                    </div>
                ))}
            </div>

            {mostrarRegistroMaquinaria && (
                <RegistroMaquinaria onClose={() => setMostrarRegistroMaquinaria(false)} />
            )}

            {mostrarRegistroProductor && (
                <RegistroProductor onClose={() => setMostrarRegistroProductor(false)} />
            )}
        </div>
    );
};

export default Equipo;
