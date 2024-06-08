import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  return (
    <div className="relative h-screen">
      <MapContainer center={[23.0225, 72.5714]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[23.0225, 72.5714]}>
          <Popup>Refill Smart</Popup>
        </Marker>
      </MapContainer>
      <button className="absolute top-4 left-4 bg-white p-2 rounded shadow hover:bg-gray-100">
        Get Direction
      </button>
    </div>
  );
}

export default MapComponent;