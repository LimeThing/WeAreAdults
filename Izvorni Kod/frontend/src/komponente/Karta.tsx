import React, { useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import { Karta, LocationsWindow } from "./stilovi";
import RezervacijaPopup from "./RezervacijaPopup";
import { mockKBC } from "./stranice/komunalije/mock_podatci";

export function MyMap() {
  const initialCenter: [number, number] = [44.46212, 16.50319];
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [showPopup, setShowPopup] = useState(false);
  const [zoom, setZoom] = useState(7.3);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  

  return (
    <Karta>
    <Map 
      height={700} 
      width={700}
      zoom={zoom} 
      center={center}
      onBoundsChanged={({ center, zoom }) => { 
        setCenter(center as [number, number]) 
        setZoom(zoom) 
      }} 
      onClick={() => setSelectedLocation(null)}
    >
    
    {mockKBC.map((kbc, index) => (
          <Marker 
            key={index} 
            anchor={[kbc.longitude, kbc.latitude]} 
            color='#b63e3e' 
            onClick={() => setSelectedLocation({ ...kbc, index })}
          />
        ))}

        {mockKBC.map((kbc, index) => (
          <Overlay anchor={[kbc.longitude, kbc.latitude - 0.7]} >
          <LocationsWindow 
            key={index}
            style={{
              display: selectedLocation && selectedLocation.index === index ? 'block' : 'none',
            }}
          >
            <p>{kbc.ime}</p>
            <button>Rezerviraj termin</button>
          </LocationsWindow>
          </Overlay>
        ))}
       
    </Map>
    </Karta>
  );
}

export default MyMap;
