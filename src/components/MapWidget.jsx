import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapWidget.css';

export default function MapWidget() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        const messages = {
          1: 'Location permission denied.',
          2: 'Position unavailable.',
          3: 'Location request timed out.',
        };
        setError(messages[err.code] || 'Could not get location.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  if (loading) {
    return (
      <div className="map-widget map-widget--placeholder">
        <div className="map-widget__spinner" />
        <span>Acquiring location…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-widget map-widget--placeholder">
        <span className="map-widget__error">{error}</span>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="map-widget map-widget--placeholder">
        <span>Could not find location</span>
      </div>
    );
  }

  return (
    <div className="map-widget">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Outer ripple circle */}
        <CircleMarker
          center={[location.lat, location.lng]}
          radius={18}
          pathOptions={{
            color: 'red',
            weight: 2,
            fillColor: 'red',
            fillOpacity: 0.15,
          }}
        />
        {/* Inner dot */}
        <CircleMarker
          center={[location.lat, location.lng]}
          radius={6}
          pathOptions={{
            color: '#fff',
            weight: 2,
            fillColor: 'red',
            fillOpacity: 1,
          }}
        />
      </MapContainer>
    </div>
  );
}
