import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { calcularBalancePorEtapaYCultivo, calcularEstadoResultadosDetalladoPorCultivo, calcularFlujoEfectivoPorEtapaYCultivo } from './Calculos';

const exportarEjercicioCompleto = (ejercicio, movimientosEjercicio, datosEjercicio) => {
  const wb = XLSX.utils.book_new();

  // 1. Hoja de Resumen
  const resumenData = [
    { Campo: 'Número de Ejercicio', Valor: ejercicio },
    { Campo: 'Fecha de Inicio', Valor: datosEjercicio.fechaInicio || '' },
    { Campo: 'Fecha de Fin', Valor: datosEjercicio.fechaFin || '' },
    { Campo: 'Estado', Valor: datosEjercicio.estado || '' },
    { Campo: 'Comentarios', Valor: '' },
  ];
  const wsResumen = XLSX.utils.json_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen');

  // 2. Hoja de Balance General
  const wsBalance = XLSX.utils.aoa_to_sheet([
    ['Balance General'],
    ['Etapa', 'Cultivo', 'Tipo', 'Categoría', 'Monto'],
    ['Preparación', '', 'Activos', 'Inventario de Sementera en Proceso', ''],
    ['Preparación', '', 'Pasivos', '', ''],
    ['Siembra y Cuidados', '', 'Activos', 'Inventario de Sementera en Proceso', ''],
    ['Siembra y Cuidados', '', 'Pasivos', '', ''],
    ['Cosecha', '', 'Activos', 'Inventario de Productos', ''],
    ['Cosecha', '', 'Pasivos', '', ''],
    ['Comercialización', '', 'Activos', 'Efectivo', ''],
    ['Comercialización', '', 'Pasivos', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsBalance, 'Balance General');

  // 3. Hoja de Estado de Resultados
  const wsEstadoResultados = XLSX.utils.aoa_to_sheet([
    ['Estado de Resultados'],
    ['Etapa', 'Cultivo', 'Ingresos', 'Costos de Producción', 'Costo de Ventas', 'Resultado Bruto', 'Resultado Neto'],
    ['Preparación', '', '', '', '', '', ''],
    ['Siembra y Cuidados', '', '', '', '', '', ''],
    ['Cosecha', '', '', '', '', '', ''],
    ['Comercialización', '', '', '', '', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsEstadoResultados, 'Estado de Resultados');

  // 4. Hoja de Flujo de Efectivo
  const wsFlujoEfectivo = XLSX.utils.aoa_to_sheet([
    ['Flujo de Efectivo'],
    ['Etapa', 'Cultivo', 'Tipo', 'Categoría', 'Monto'],
    ['Preparación', '', 'Entradas', '', ''],
    ['Preparación', '', 'Salidas', '', ''],
    ['Siembra y Cuidados', '', 'Entradas', '', ''],
    ['Siembra y Cuidados', '', 'Salidas', '', ''],
    ['Cosecha', '', 'Entradas', '', ''],
    ['Cosecha', '', 'Salidas', '', ''],
    ['Comercialización', '', 'Entradas', '', ''],
    ['Comercialización', '', 'Salidas', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsFlujoEfectivo, 'Flujo de Efectivo');

  // 5. Hoja de Transacciones
  const headerTransacciones = ['Fecha', 'Tipo', 'Etapa', 'Cultivo', 'Monto', 'Categoría', 'Descripción'];
  const wsTransacciones = XLSX.utils.aoa_to_sheet([headerTransacciones]);
  XLSX.utils.sheet_add_json(wsTransacciones, movimientosEjercicio, { origin: 'A2', skipHeader: true });
  XLSX.utils.book_append_sheet(wb, wsTransacciones, 'Transacciones');

  // 6. Hoja de Análisis de Cultivos
  const wsAnalisisCultivos = XLSX.utils.aoa_to_sheet([
    ['Análisis de Cultivos'],
    ['Cultivo', 'Rendimiento', 'Meta de Producción', 'Resultado Real'],
    ['', '', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsAnalisisCultivos, 'Análisis de Cultivos');

  // 7. Hoja de Inventario
  const wsInventario = XLSX.utils.aoa_to_sheet([
    ['Inventario'],
    ['Cultivo', 'Etapa', 'Cantidad', 'Valor', 'Ajustes'],
    ['', '', '', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsInventario, 'Inventario');

  // 8. Hoja de Notas y Observaciones
  const wsNotas = XLSX.utils.aoa_to_sheet([
    ['Notas y Observaciones'],
    ['Fecha', 'Evento', 'Decisión', 'Lección Aprendida'],
    ['', '', '', ''],
  ]);
  XLSX.utils.book_append_sheet(wb, wsNotas, 'Notas y Observaciones');

  // Guardar el archivo Excel
  XLSX.writeFile(wb, `Ejercicio_${ejercicio}.xlsx`);
};

// Componente para el botón de descarga
const ExportarEjercicio = ({ ejercicio, movimientosEjercicio, datosEjercicio }) => {
  const handleExport = () => {
    exportarEjercicioCompleto(ejercicio, movimientosEjercicio, datosEjercicio);
  };

  return (
    <button onClick={handleExport}>
      Descargar Ejercicio Completo
    </button>
  );
};

export default ExportarEjercicio;
