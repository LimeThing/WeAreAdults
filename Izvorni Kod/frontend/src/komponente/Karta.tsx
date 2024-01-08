import React, { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Karta } from "./stilovi";
import RezervacijaPopup from "./RezervacijaPopup";

export function MyMap() {
  const initialCenter: [number, number] = [44.46212, 16.50319];
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [zoom, setZoom] = useState(7);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {showPopup && <RezervacijaPopup />}
      <Karta>
        <Map
          height={600}
          width={600}
          zoom={zoom}
          center={center}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center as [number, number]);
            setZoom(zoom);
          }}
        >
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[45.5600001, 18.67588]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[45.32691, 14.441]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[45.50695, 16.44238]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[42.64983, 18.07733]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[46.30269, 16.32512]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[44.10752, 15.23459]} color="#b63e3e" />
          <Marker onClick={() => setShowPopup(!showPopup)} anchor={[45.81612, 15.99121]} color="#b63e3e" />
        </Map>
      </Karta>
    </>
  );
}

export default MyMap;
