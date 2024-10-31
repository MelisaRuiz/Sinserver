import React, { useState } from 'react';
import gestionIcon from './Imagenes/rueda.png';
import flechaIcon from './Imagenes/flecha.png';
import PropTypes from 'prop-types';

const SidebarGestion = ({ text, options = [], onClick, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGestion = () => {
    setIsOpen(!isOpen);
    onClick(text); // Notifica al componente padre cuando se selecciona una opción
  };

  const handleFlechaClick = (e) => {
    e.stopPropagation(); // Evita que el clic en la flecha active/desactive el botón principal
    toggleGestion(); // Mantiene la funcionalidad de desplegar
  };

  return (
    <div className={`gestion-contenedor boton-contenedor ${isActive ? 'active' : ''}`}>
      <div className="boton-gestion" onClick={toggleGestion}>
        <button id="icono-gestion">
          <img src={gestionIcon} alt={text} className="icono-gestion" />
          <span className="gestion">{text}</span>
        </button>
        <button id="desplegar" onClick={handleFlechaClick} className="desplegar"> {/* Cambiado a className */}
          <img src={flechaIcon} alt="flecha" className="flecha" />
        </button>
      </div>
      <div className={`contenido-gestion ${isOpen ? '' : 'oculto'}`}>
        {options.map((option, index) => (
          <a href="#" key={index} onClick={() => onClick(option)}>
            {option}
          </a>
        ))}
      </div>
    </div>
  );
};

SidebarGestion.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool // Maneja si el ítem está activo
};

export default SidebarGestion;
