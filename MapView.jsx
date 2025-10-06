import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// icon workaround for default marker images with Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView({ alerts }){
  const center = [-9.9306, -76.2422] // Huánuco
  return (
    <MapContainer center={center} zoom={13} style={{height:'100%', width:'100%'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {alerts.map(a=>(
        a.lat && a.lng ? (
          <Marker key={a.id} position={[a.lat, a.lng]}>
            <Popup>
              <div>
                <strong>{a.userId || 'Usuario'}</strong><br/>
                {a.timestamp && a.timestamp.toDate ? a.timestamp.toDate().toLocaleString() : ''}<br/>
                Estado: {a.acknowledged? 'Atendida':'Pendiente'}
              </div>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  )
}
