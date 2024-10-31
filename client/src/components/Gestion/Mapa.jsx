import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon, Tooltip } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Nota: La siguiente línea se ha eliminado y el CSS se carga desde index.html
// import 'leaflet-draw/dist/leaflet.draw.css';
import './Mapa.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x.png',
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
});

const Mapa = ({ onParcelaSeleccionada, onNuevaParcelaCreada, parcelas }) => {
    const mapRef = useRef();
    const featureGroupRef = useRef();

    useEffect(() => {
        if (mapRef.current && featureGroupRef.current) {
            const map = mapRef.current;
            const featureGroup = featureGroupRef.current;

            if (featureGroup.getLayers().length > 0) {
                map.fitBounds(featureGroup.getBounds());
            }
        }
    }, [parcelas]);

    const handleCreated = (e) => {
        const { layer } = e;
        const coordenadas = layer.getLatLngs()[0].map(coord => ({
            lat: coord.lat,
            lng: coord.lng
        }));
        onNuevaParcelaCreada(coordenadas);
    };

    const calcularCentro = (coordenadas) => {
        const latitudes = coordenadas.map(coord => coord.lat);
        const longitudes = coordenadas.map(coord => coord.lng);
        const latMedia = latitudes.reduce((a, b) => a + b) / latitudes.length;
        const lngMedia = longitudes.reduce((a, b) => a + b) / longitudes.length;
        return [latMedia, lngMedia];
    };

    return (
        <MapContainer center={[-23.442503, -58.443832]} zoom={7} ref={mapRef} style={{ height: "400px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    position="topright"
                    onCreated={handleCreated}
                    draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                    }}
                />
                {parcelas.map((parcela) => (
                    <Polygon
                        key={parcela.id}
                        positions={parcela.coordenadas}
                        eventHandlers={{
                            click: () => onParcelaSeleccionada(parcela.id),
                        }}
                    >
                        <Tooltip direction="center" offset={[0, 0]} opacity={1} permanent>
                            <span>{parcela.nombre}</span>
                        </Tooltip>
                        <Tooltip>
                            <div>
                                <strong>{parcela.nombre}</strong><br />
                                Área: {parcela.area} hectáreas<br />
                                Cultivo: {parcela.tipoCultivo}<br />
                                Fase: {parcela.fase}
                            </div>
                        </Tooltip>
                    </Polygon>
                ))}
            </FeatureGroup>
        </MapContainer>
    );
};

export default Mapa;