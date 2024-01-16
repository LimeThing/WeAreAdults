import React, { useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import { Karta, LocationsWindow } from "./stilovi";
import RezervacijaPopup from "./RezervacijaPopup";
import { AkcijaModel, KBCModel } from "./modeli";
import useToken from "./stranice/udice/useCookies";

interface MyMapProps {
  aktivneAkcije: AkcijaModel[];
  KBC: KBCModel[];
}

export function MyMap({ aktivneAkcije, KBC }: MyMapProps) {
  const initialCenter: [number, number] = [44.46212, 16.50319];
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [showPopup, setShowPopup] = useState(false);
  const [zoom, setZoom] = useState(7.3);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedIme, setSelectedIme] = useState<string | undefined>();
  const { token } = useToken();

  const handleMarkerClick = (location: any, index: number, type: string) => {
    setSelectedLocation({ ...location, index, type });
  };

  return (
    <>
      {showPopup && <RezervacijaPopup closeFun={setShowPopup} close={showPopup} imeLokacije={selectedIme} />}
      <Karta>
        <Map
          height={700}
          width={700}
          zoom={zoom}
          center={center}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center as [number, number]);
            setZoom(zoom);
          }}
          onClick={() => setSelectedLocation(null)}
        >
          {KBC.map((kbc, index) => (
            <Marker
              key={`kbc-${index}`}
              anchor={[kbc.geo_sirina, kbc.geo_duzina]}
              color="#b63e3e"
              onClick={() => { setSelectedIme(kbc.ime)
                handleMarkerClick(kbc, index, "kbc")}}
            />
          ))}

          {KBC.map((kbc, index) => (
            <Overlay
              anchor={[kbc.geo_sirina, kbc.geo_duzina]}
              key={`kbc-overlay-${index}`}
            >
              <LocationsWindow
                style={{
                  display:
                    selectedLocation &&
                    selectedLocation.type === "kbc" &&
                    selectedLocation.index === index
                      ? "block"
                      : "none",
                }}
              >
                <p>{kbc.ime}</p>
                {(!!token && token !== "admin" ) && <button onClick={() => setShowPopup(!showPopup)}>Rezerviraj termin</button>}
              </LocationsWindow>
            </Overlay>
          ))}

          {aktivneAkcije.map((akcija, index) => (
            <Marker
              key={`akcija-${index}`}
              anchor={[akcija.geo_sirina, akcija.geo_duzina]}
              color="#b63e3e"
              onClick={() => { setSelectedIme(akcija.imeLokacije)
                handleMarkerClick(akcija, index, "akcija")}}
            />
          ))}
          {aktivneAkcije.map((akcija, index) => (
            <Overlay
              anchor={[akcija.geo_sirina, akcija.geo_duzina]}
              key={`akcija-overlay-${index}`}
            >
              <LocationsWindow
                style={{
                  display:
                    selectedLocation &&
                    selectedLocation.type === "akcija" &&
                    selectedLocation.index === index
                      ? "block"
                      : "none",
                }}
              >
                <p>{akcija.imeLokacije}</p>
                {(!!token && token !== "admin" ) && <button onClick={() => setShowPopup(!showPopup)}>Rezerviraj termin</button>}
              </LocationsWindow>
            </Overlay>
          ))}
        </Map>
      </Karta>
    </>
  );
}

export default MyMap;
