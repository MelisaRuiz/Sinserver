const agruparPorEtapaYCultivo = (movimientos) => {
  return movimientos.reduce((acc, mov) => {
    const etapa = mov.etapa || 'Sin Etapa';
    const cultivo = mov.cultivo || 'Sin Cultivo';
    if (!acc[etapa]) acc[etapa] = {};
    if (!acc[etapa][cultivo]) acc[etapa][cultivo] = [];
    acc[etapa][cultivo].push(mov);
    return acc;
  }, {});
};

export const calcularBalancePorEtapaYCultivo = (movimientosEjercicio) => {
  console.log("Calculando balance con movimientos:", movimientosEjercicio);
  const movimientosPorEtapaYCultivo = agruparPorEtapaYCultivo(Object.values(movimientosEjercicio).flat());

  return Object.entries(movimientosPorEtapaYCultivo).reduce((acc, [etapa, cultivosMovimientos]) => {
    acc[etapa] = Object.entries(cultivosMovimientos).reduce((cultivoAcc, [cultivo, movimientos]) => {
      cultivoAcc[cultivo] = movimientos.reduce((etapaAcc, mov) => {
        const categoria = mov.categoria || 'Sin Categoría';
        if (!etapaAcc.Activos) etapaAcc.Activos = {};
        if (!etapaAcc.Pasivos) etapaAcc.Pasivos = {};

        if (['Preparación', 'Siembra y Cuidados'].includes(etapa)) {
          if (!etapaAcc.Activos[`Inventario de Sementera en Proceso - ${cultivo}`]) 
            etapaAcc.Activos[`Inventario de Sementera en Proceso - ${cultivo}`] = 0;
          etapaAcc.Activos[`Inventario de Sementera en Proceso - ${cultivo}`] += mov.monto;
        } else if (etapa === 'Cosecha') {
          if (!etapaAcc.Activos[`Inventario de Productos - ${cultivo}`]) 
            etapaAcc.Activos[`Inventario de Productos - ${cultivo}`] = 0;
          etapaAcc.Activos[`Inventario de Productos - ${cultivo}`] += mov.monto;
        } else if (etapa === 'Comercialización' && mov.tipoMovimiento === 'Ingresos') {
          if (!etapaAcc.Activos['Efectivo']) etapaAcc.Activos['Efectivo'] = 0;
          etapaAcc.Activos['Efectivo'] += mov.monto;
        } else {
          if (!etapaAcc.Pasivos[categoria]) etapaAcc.Pasivos[categoria] = 0;
          etapaAcc.Pasivos[categoria] += mov.monto;
        }

        return etapaAcc;
      }, {});
      return cultivoAcc;
    }, {});
    return acc;
  }, {});
};

export const calcularEstadoResultadosDetalladoPorCultivo = (movimientosEjercicio) => {
  console.log("Calculando estado de resultados con movimientos:", movimientosEjercicio);
  const movimientosPorEtapaYCultivo = agruparPorEtapaYCultivo(Object.values(movimientosEjercicio).flat());

  return Object.entries(movimientosPorEtapaYCultivo).reduce((acc, [etapa, cultivosMovimientos]) => {
    acc[etapa] = Object.entries(cultivosMovimientos).reduce((cultivoAcc, [cultivo, movimientos]) => {
      cultivoAcc[cultivo] = movimientos.reduce((etapaAcc, mov) => {
        if (!etapaAcc.Ingresos) etapaAcc.Ingresos = 0;
        if (!etapaAcc.CostosProduccion) etapaAcc.CostosProduccion = 0;
        if (!etapaAcc.CostoVentas) etapaAcc.CostoVentas = 0;

        if (mov.tipoMovimiento === 'Ingresos') {
          etapaAcc.Ingresos += mov.monto;
        } else if (etapa === 'Comercialización') {
          etapaAcc.CostoVentas += mov.monto;
        } else {
          etapaAcc.CostosProduccion += mov.monto;
        }

        etapaAcc.ResultadoBruto = etapaAcc.Ingresos - etapaAcc.CostoVentas;
        etapaAcc.ResultadoNeto = etapaAcc.ResultadoBruto - etapaAcc.CostosProduccion;

        return etapaAcc;
      }, {});
      return cultivoAcc;
    }, {});
    return acc;
  }, {});
};

export const calcularFlujoEfectivoPorEtapaYCultivo = (movimientosEjercicio) => {
  console.log("Calculando flujo de efectivo con movimientos:", movimientosEjercicio);
  const movimientosPorEtapaYCultivo = agruparPorEtapaYCultivo(Object.values(movimientosEjercicio).flat());

  return Object.entries(movimientosPorEtapaYCultivo).reduce((acc, [etapa, cultivosMovimientos]) => {
    acc[etapa] = Object.entries(cultivosMovimientos).reduce((cultivoAcc, [cultivo, movimientos]) => {
      cultivoAcc[cultivo] = movimientos.reduce((etapaAcc, mov) => {
        const categoria = mov.categoria || 'Sin Categoría';
        const tipo = mov.tipoMovimiento === 'Ingresos' ? 'Entradas' : 'Salidas';
        if (!etapaAcc[tipo]) etapaAcc[tipo] = {};
        if (!etapaAcc[tipo][categoria]) etapaAcc[tipo][categoria] = 0;
        etapaAcc[tipo][categoria] += mov.monto;
        return etapaAcc;
      }, {});

      // Calcular el flujo neto por cultivo
      cultivoAcc[cultivo].FlujoNeto = 
        (cultivoAcc[cultivo].Entradas ? Object.values(cultivoAcc[cultivo].Entradas).reduce((sum, val) => sum + val, 0) : 0) -
        (cultivoAcc[cultivo].Salidas ? Object.values(cultivoAcc[cultivo].Salidas).reduce((sum, val) => sum + val, 0) : 0);

      return cultivoAcc;
    }, {});
    return acc;
  }, {});
};

export const calcularResumenFinanciero = (movimientosEjercicio) => {
  const balanceGeneral = calcularBalancePorEtapaYCultivo(movimientosEjercicio);
  const estadoResultados = calcularEstadoResultadosDetalladoPorCultivo(movimientosEjercicio);
  const flujoEfectivo = calcularFlujoEfectivoPorEtapaYCultivo(movimientosEjercicio);

  return {
    BalanceGeneral: balanceGeneral,
    EstadoResultados: estadoResultados,
    FlujoEfectivo: flujoEfectivo
  };
};
