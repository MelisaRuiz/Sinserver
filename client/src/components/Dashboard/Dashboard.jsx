import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { EjerciciosContext } from '../Registro/EjerciciosContext';
import { ActividadesContext } from '../Gestion/ActividadesContext';
import { ParcelasContext } from '../Gestion/ParcelasContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { ejercicios, movimientos } = useContext(EjerciciosContext);
    const { actividades } = useContext(ActividadesContext);
    const { parcelas } = useContext(ParcelasContext);
    const [ventasTotales, setVentasTotales] = useState({labels: [], datasets: []});
    const [costosVsIngresos, setCostosVsIngresos] = useState({labels: [], datasets: []});
    const [cultivosRentables, setCultivosRentables] = useState({labels: [], datasets: []});
    const [flujoEfectivo, setFlujoEfectivo] = useState({labels: [], datasets: []});
    const [graficoSeleccionado, setGraficoSeleccionado] = useState('ventasTotales');

    useEffect(() => {

        // Aquí iría la lógica para procesar los datos y actualizar los estados de los gráficos
        // Por ahora, vamos a establecer algunos datos de ejemplo para evitar errores

        setVentasTotales({
            labels: ['Enero', 'Febrero', 'Marzo'],
            datasets: [{
                label: 'Ventas Totales',
                data: [12, 19, 3],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        });

        setCostosVsIngresos({
            labels: ['Enero', 'Febrero', 'Marzo'],
            datasets: [
                {
                    label: 'Costos',
                    data: [10, 15, 7],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Ingresos',
                    data: [12, 19, 3],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
        });

        setCultivosRentables({
            labels: ['Maíz', 'Trigo', 'Soja'],
            datasets: [{
                label: 'Rentabilidad',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                ],
            }]
        });

        setFlujoEfectivo({
            labels: ['Enero', 'Febrero', 'Marzo'],
            datasets: [{
                label: 'Flujo de Efectivo',
                data: [2, 4, -4],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }]
        });

    }, [ejercicios, actividades, parcelas]);

    if (!ejercicios || !actividades || !parcelas) {
        return <div>Cargando datos...</div>;
    }

    const renderGraficoSeleccionado = () => {
        switch(graficoSeleccionado) {
            case 'ventasTotales':
                return <Line data={ventasTotales} />;
            case 'costosVsIngresos':
                return <Bar data={costosVsIngresos} />;
            case 'cultivosRentables':
                return <Pie data={cultivosRentables} />;
            case 'flujoEfectivo':
                return <Bar data={flujoEfectivo} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
           
            <div className="grafico">
                <h2>{graficoSeleccionado === 'ventasTotales' ? 'Ventas Totales' : 
                     graficoSeleccionado === 'costosVsIngresos' ? 'Costos vs Ingresos por Cultivo' :
                     graficoSeleccionado === 'cultivosRentables' ? 'Rentabilidad por Cultivo' :
                     'Flujo de Efectivo'}</h2>
                {renderGraficoSeleccionado()}
            </div>
            <div className="botones-graficos">
                <button onClick={() => setGraficoSeleccionado('ventasTotales')}>Ventas Totales</button>
                <button onClick={() => setGraficoSeleccionado('costosVsIngresos')}>Costos vs Ingresos</button>
                <button onClick={() => setGraficoSeleccionado('cultivosRentables')}>Rentabilidad por Cultivo</button>
                <button onClick={() => setGraficoSeleccionado('flujoEfectivo')}>Flujo de Efectivo</button>
            </div>
        </div>
    );
};

export default Dashboard;
