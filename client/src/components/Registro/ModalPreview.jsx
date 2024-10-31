import React, { useState } from 'react';
import './ModalPreview.css';

const ModalPreview = ({ datos, onClose }) => {
  const [vistaActual, setVistaActual] = useState('balance');

  const renderTabla = () => {
    if (!datos || !datos[vistaActual]) {
      return <p>No hay datos disponibles para esta vista.</p>;
    }

    const datosVista = datos[vistaActual];

    switch (vistaActual) {
      case 'balance':
        return (
          <table className="preview-table">
            <thead>
              <tr>
                <th>Etapa</th>
                <th>Cultivo</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(datosVista).flatMap(([etapa, cultivosData]) =>
                Object.entries(cultivosData).flatMap(([cultivo, data]) =>
                  Object.entries(data).flatMap(([tipo, categorias]) =>
                    Object.entries(categorias).map(([categoria, monto], index) => (
                      <tr key={`${etapa}-${cultivo}-${tipo}-${categoria}-${index}`}>
                        <td>{etapa}</td>
                        <td>{cultivo !== 'Sin Cultivo' ? cultivo : ''}</td>
                        <td>{tipo}</td>
                        <td>{categoria}</td>
                        <td>{monto}</td>
                      </tr>
                    ))
                  )
                )
              )}
            </tbody>
          </table>
        );

      case 'estadoResultados':
        return (
          <table className="preview-table">
            <thead>
              <tr>
                <th>Etapa</th>
                <th>Cultivo</th>
                <th>Ingresos</th>
                <th>C. Producción</th>
                <th>C. Ventas</th>
                <th>Rslt Bruto</th>
                <th>Rslt Neto</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(datosVista).flatMap(([etapa, cultivosData]) =>
                Object.entries(cultivosData).map(([cultivo, data]) => (
                  <tr key={`${etapa}-${cultivo}`}>
                    <td>{etapa}</td>
                    <td>{cultivo !== 'Sin Cultivo' ? cultivo : ''}</td>
                    <td>{data.Ingresos}</td>
                    <td>{data.CostosProduccion}</td>
                    <td>{data.CostoVentas}</td>
                    <td>{data.ResultadoBruto}</td>
                    <td>{data.ResultadoNeto}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        );

      case 'flujoEfectivo':
        return (
          <table className="preview-table">
            <thead>
              <tr>
                <th>Etapa</th>
                <th>Cultivo</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(datosVista).flatMap(([etapa, cultivosData]) =>
                Object.entries(cultivosData).flatMap(([cultivo, data]) =>
                  Object.entries(data).flatMap(([tipo, categorias]) =>
                    Object.entries(categorias).map(([categoria, monto], index) => (
                      <tr key={`${etapa}-${cultivo}-${tipo}-${categoria}-${index}`}>
                        <td>{etapa}</td>
                        <td>{cultivo !== 'Sin Cultivo' ? cultivo : ''}</td>
                        <td>{tipo}</td>
                        <td>{categoria}</td>
                        <td>{monto}</td>
                      </tr>
                    ))
                  )
                )
              )}
            </tbody>
          </table>
        );

      default:
        return <p>Vista no reconocida</p>;
    }
  };

  return (
    <div className="modal-preview">
      <div className="modal-preview-content">
        <div className="modal-preview-header">
          <h2 className="modal-preview-title">Vista previa del ejercicio</h2>
          <button className="modal-preview-close" onClick={onClose}>&times;</button>
        </div>
        <div className="preview-buttons">
          <button 
            className={`preview-button ${vistaActual === 'balance' ? 'active' : ''}`}
            onClick={() => setVistaActual('balance')}
          >
            Balance
          </button>
          <button 
            className={`preview-button ${vistaActual === 'estadoResultados' ? 'active' : ''}`}
            onClick={() => setVistaActual('estadoResultados')}
          >
            Estado de Resultados
          </button>
          <button 
            className={`preview-button ${vistaActual === 'flujoEfectivo' ? 'active' : ''}`}
            onClick={() => setVistaActual('flujoEfectivo')}
          >
            Flujo de Efectivo
          </button>
        </div>
        <div className="preview-content">
          {renderTabla()}
        </div>
      </div>
    </div>
  );
};

export default ModalPreview;
