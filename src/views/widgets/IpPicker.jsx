import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const IpPicker = ({onChangeValue, value}) => {
  const [clickedPosition, setClickedPosition] = useState(null);

  // Xử lý sự kiện click trên bản đồ để lấy tọa độ
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setClickedPosition({ lat, lng });
    onChangeValue({lat,lng})
  };

  // Component để lắng nghe sự kiện click trên bản đồ
  const ClickHandler = () => {
    const map = useMapEvents({
      click: handleMapClick, // Gọi hàm handleMapClick khi bản đồ được click
    });
    return null; // Không cần render gì trong component này
  };

  return (
    <div style={{ height: '400px' }}>
      <MapContainer center={[16.0544, 108.2022]} zoom={6} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Component lắng nghe sự kiện click trên bản đồ */}
        <ClickHandler />

        {/* Hiển thị đánh dấu vị trí đã click (nếu có) */}
        {clickedPosition && (
          <Marker position={clickedPosition}>
            <Popup>
              IP: <br />
              Latitude: {clickedPosition.lat.toFixed(6)} <br />
              Longitude: {clickedPosition.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default IpPicker;
