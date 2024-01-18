import React, { useState } from "react";
import DropDown from "./DropDown";

type DropDownMeniProps = {
  elementi: string[];
  setSelected: React.Dispatch<React.SetStateAction<Date>>;
}

const DropDownMeni: React.FC<DropDownMeniProps> = ({elementi, setSelected}:DropDownMeniProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [izabraniElement, setSelectElem] = useState<string>("");
  


  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };


  const biranjeElemenata = (elem: string): void => {
    setSelectElem(elem);
    setSelectElem(elem);
  };

  return (
    <div style={{height: "10rem", width: "20rem", overflow: "scroll"}}>
      <div className="announcement">
        <div>
          Izaberite sutrašnji termin.
        </div>
      </div>
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{izabraniElement ? "Izabrano: " + izabraniElement : "Izaberite ..."} </div>
        {showDropDown && (
          <DropDown
            elementi={elementi}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            biranjeElemenata={biranjeElemenata}
          />
        )}
      </button>
    </div>
  );
};

export default DropDownMeni;
