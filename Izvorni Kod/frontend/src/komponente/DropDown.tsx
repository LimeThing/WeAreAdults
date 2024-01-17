import React, { useEffect, useState } from 'react';

type DropDownProps = {
  elementi: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  biranjeElemenata: Function;
};

const DropDown: React.FC<DropDownProps> = ({
    elementi,
  biranjeElemenata,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);


  const onClickHandler = (elem: string): void => {
    biranjeElemenata(elem);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {elementi.map(
          (elem: string, index: number): JSX.Element => {
            return (
              <p style={{color: "black"}}
                key={index}
                onClick={(): void => {
                  onClickHandler(elem);
                }}
              >
                {elem}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
