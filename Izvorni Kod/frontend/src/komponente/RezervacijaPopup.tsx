import React from "react";
import DropDownMeni from "./DropDownMeni";
import { PopupContainer} from "./stilovi";

type RezervacijaPopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>,
  close: boolean
};

export default function RezervacijaPopup({ closeFun, close }: RezervacijaPopupProps) {
  return (
    <PopupContainer>
      <div>Rezervacija termina</div>
      <DropDownMeni elementi = {["AAAAAAAAA", "BBBBBBBBB", "c York City", "ff"]}/>
      <button>Rezerviraj</button>
      <button onClick={() => closeFun(!close)}>Zatvori</button>
    </PopupContainer>
  );
}
