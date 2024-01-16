import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import DropDownMeni from "./DropDownMeni";
import { TerminModel } from "./modeli";
import { PopupContainer} from "./stilovi";

type RezervacijaPopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>,
  close: boolean,
  imeLokacije?: string,
};

export default function RezervacijaPopup({ closeFun, close, imeLokacije }: RezervacijaPopupProps) {

  const fetchTermini = (): Promise<TerminModel[]> =>
    api
      .get("/termini/get_all")
      .then((response: any) => response.data);


  const { isSuccess, data: termini } = useQuery<TerminModel[]>({
    queryKey: ["getTermini", imeLokacije],
    queryFn: fetchTermini,
    enabled: !!imeLokacije,
  });

  const [terminLista, setTerminLista] = useState<string[]>([])

  useEffect(() => {
    var help: string[] = [];
    termini?.map((termin) => {if (!termin.zauzeto)
      help.push(termin.vrijemePoc.toUTCString())
    })
    setTerminLista(help)
  }, [isSuccess]);

  return (
    <PopupContainer>
      <div>Rezervacija termina</div>
      <DropDownMeni elementi = {terminLista}/>
      <button>Rezerviraj</button>
      <button onClick={() => closeFun(!close)}>Zatvori</button>
    </PopupContainer>
  );
}
