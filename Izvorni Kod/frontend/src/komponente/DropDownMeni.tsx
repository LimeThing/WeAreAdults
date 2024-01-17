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
    <>
      <div className="announcement">
        <div>
          {izabraniElement
            ? `Izabrali ste: ${izabraniElement}`
            : "Izaberite."}
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
    </>
  );
};

export default DropDownMeni;
