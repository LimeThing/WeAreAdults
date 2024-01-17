import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import DropDownMeni from "./DropDownMeni";
import { RezervacijaModel, TerminModel } from "./modeli";
import { PopupContainer} from "./stilovi";
import useToken from "./stranice/udice/useCookies";

type RezervacijaPopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>,
  close: boolean,
  imeLokacije?: string,
};

export default function RezervacijaPopup({ closeFun, close, imeLokacije }: RezervacijaPopupProps) {

  const fetchTermini = (): Promise<TerminModel[]> =>
    api
      .get("/termin/get_by_location/" + imeLokacije)
      .then((response: any) => response.data);


  const { isSuccess, data: termini } = useQuery<TerminModel[]>({
    queryKey: ["getTermini", imeLokacije],
    queryFn: fetchTermini,
    enabled: !!imeLokacije,
  });

  const {token} = useToken();

  const { mutate: postRezervacija } = useMutation({
    mutationFn: (rezervacija: RezervacijaModel) => {
      return api.post("/rezervacija/create/", rezervacija);
    },
  });

  const [terminLista, setTerminLista] = useState<string[]>([])
  const [selectedTermin, setSelectedTermin] = useState<Date>(new Date())

  useEffect(() => {
    var help: string[] = [];
    termini?.map((termin) => {if (!termin.zauzeto) {
      let terminnew = new Date(termin.vrijemePoc)
      help.push(terminnew.toUTCString())
    }
    })
    setTerminLista(help)
  }, [isSuccess]);

  return (
    <PopupContainer>
      <div>Rezervacija termina</div>
      <DropDownMeni elementi = {terminLista} setSelected={setSelectedTermin}/>
      <button onClick={() => {
        let rezervacija: RezervacijaModel = {
          idRezervacija: 0,
          vrijemePoc: selectedTermin,
          imeLokacije: imeLokacije ?? "",
          mbo: token ?? "111111111"
        };
         postRezervacija(rezervacija);
      }}>Rezerviraj</button>
      <button onClick={() => closeFun(!close)}>Zatvori</button>
    </PopupContainer>
  );
}
