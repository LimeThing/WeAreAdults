import React from "react";

type RezervacijaPopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>,
  close: boolean
};

export default function RezervacijaPopup({ closeFun, close }: RezervacijaPopupProps) {
  return (
    <>
      <div>Rezervacija termina</div>
      <button onClick={() => closeFun(!close)}>Zatvori</button>
    </>
  );
}
