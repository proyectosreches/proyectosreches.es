import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';

// Coordinates for Carrer de Dante Alighieri 133, Barcelona
const POSITION = { lat: 41.4284, lng: 2.1611 };

const MapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [POSITION.lat, POSITION.lng],
        zoom: 15,
        scrollWheelZoom: false, // Prevent scrolling page from zooming map
      });

      // Add Tile Layer (CartoDB Voyager for a clean look, or OpenStreetMap)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Define custom icon to ensure it loads correctly without bundler
      const icon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Add Marker
      const marker = L.marker([POSITION.lat, POSITION.lng], { icon: icon }).addTo(map);
      
      // Add Popup
      marker.bindPopup(`
        <div style="text-align: center;">
          <strong style="font-size: 14px; color: #D97706;">Proyectos Reches</strong><br/>
          Carrer de Dante Alighieri 133<br/>
          08032 Barcelona
        </div>
      `).openPopup();

      mapInstanceRef.current = map;
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Dónde Estamos</h2>
          <p className="text-slate-500">
            Visítanos en nuestra oficina o contáctanos para una visita a obra.
          </p>
        </div>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 z-0">
          <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 1 }} />
        </div>
      </div>
    </section>
  );
};

export default MapSection;