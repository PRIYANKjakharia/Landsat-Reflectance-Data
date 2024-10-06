import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

function Map() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (e) => {
    const newMarker = {
      position: e.latlng,
      id: Date.now(),
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={3}
      style={{ height: '500px', width: '100%' }}
      onClick={addMarker}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            Latitude: {marker.position.lat.toFixed(4)}, 
            Longitude: {marker.position.lng.toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;