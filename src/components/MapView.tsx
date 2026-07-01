import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  lat: number;
  lng: number;
  interactive?: boolean;
  onPositionChange?: (lat: number, lng: number) => void;
}

function LocationMarker({ 
  lat, 
  lng, 
  interactive, 
  onPositionChange 
}: { 
  lat: number; 
  lng: number; 
  interactive?: boolean; 
  onPositionChange?: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<L.LatLng>(new L.LatLng(lat, lng));

  useEffect(() => {
    setPosition(new L.LatLng(lat, lng));
  }, [lat, lng]);

  const map = useMapEvents({
    click(e) {
      if (interactive && onPositionChange) {
        setPosition(e.latlng);
        onPositionChange(e.latlng.lat, e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Lokasi Kejadian</Popup>
    </Marker>
  );
}

export default function MapView({ lat, lng, interactive = false, onPositionChange }: MapViewProps) {
  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={16} 
      scrollWheelZoom={true}
      doubleClickZoom={!interactive}
      dragging={true}
      zoomControl={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker lat={lat} lng={lng} interactive={interactive} onPositionChange={onPositionChange} />
    </MapContainer>
  );
}
