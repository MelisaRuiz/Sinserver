import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Registro from '../Registro/Registro';
import Gestion from "../Gestion/Gestion";
import Comunidad from "../Comunidad/Comunidad";
import { ParcelasProvider } from "../Gestion/ParcelasContext";
import { EjerciciosProvider } from "../Registro/EjerciciosContext";
import { ActividadesProvider } from "../Gestion/ActividadesContext";
import { EquipoProvider } from "../Gestion/EquipoContext";
import './App.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

    const handleSidebarClick = (section) => {
        setActiveSection(section);
    };

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <ParcelasProvider>
            <ActividadesProvider>
                <EjerciciosProvider>
                    <EquipoProvider>
                        <Router basename="/">
                            <div className={`app-container ${isMinimized ? 'sidebar-minimized' : ''}`}>
                                <Sidebar 
                                    onClick={handleSidebarClick} 
                                    activeSection={activeSection} 
                                    isMinimized={isMinimized} 
                                    toggleSidebar={toggleSidebar}
                                />
                                <main className="main-content">
                                    <Routes>
                                        <Route path="/registro" element={<Registro />} />
                                        <Route path="/gestion" element={<Gestion />} />
                                        <Route path="/comunidad" element={<Comunidad />} />
                                    </Routes>
                                </main>
                            </div>
                        </Router>
                    </EquipoProvider>
                </EjerciciosProvider>
            </ActividadesProvider>
        </ParcelasProvider>
    );
};

export default App;
