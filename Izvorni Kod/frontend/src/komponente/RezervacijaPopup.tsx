import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { api } from "../api";
import DropDownMeni from "./DropDownMeni";
import { RezervacijaModel, TerminModel } from "./modeli";
import { FlexBox, PopupContainer } from "./stilovi";
import useToken from "./stranice/udice/useCookies";
import formatDate from "./stranice/udice/useFormatDate";

type RezervacijaPopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>;
  close: boolean;
  imeLokacije?: string;
};

export default function RezervacijaPopup({
  closeFun,
  close,
  imeLokacije,
}: RezervacijaPopupProps) {
  const fetchTermini = (): Promise<TerminModel[]> =>
    api
      .get("/termin/get_by_location/" + imeLokacije)
      .then((response: any) => response.data);

  const { isSuccess, data: termini } = useQuery<TerminModel[]>({
    queryKey: ["getTermini", imeLokacije],
    queryFn: fetchTermini,
    enabled: !!imeLokacije,
  });

  const { token } = useToken();

  const { mutate: postRezervacija } = useMutation({
    mutationFn: (rezervacija: RezervacijaModel) => {
      return api.post("/rezervacija/create/", rezervacija);
    },
  });

  const [terminLista, setTerminLista] = useState<string[]>([]);
  const [selectedTermin, setSelectedTermin] = useState<Date>(new Date());

  useEffect(() => {
    var help: string[] = [];
    termini?.map((termin) => {
      if (!termin.zauzeto) {
        let terminnew = new Date(termin.vrijemePoc);
        help.push(
          `${
            terminnew.getHours() <= 9
              ? "0" + terminnew.getHours()
              : terminnew.getHours()
          }:${
            terminnew.getMinutes() <= 9
              ? "0" + terminnew.getMinutes()
              : terminnew.getMinutes()
          }`
        );
      }
    });
    setTerminLista(help);
  }, [isSuccess]);

  return (
    <PopupContainer style={{ padding: "1rem", borderRadius: "20px" }}>
      <div>Rezervacija termina</div>
      <DropDownMeni elementi={terminLista} setSelected={setSelectedTermin} />
      <FlexBox>
        <button
          onClick={() => {
            let today = new Date();
            today.setDate(today.getDate() + 1);
            let rezervacija: RezervacijaModel = {
              idRezervacija: 0,
              vrijemePoc: new Date(
                `${formatDate(today)}T${
                  selectedTermin.getHours() <= 9
                    ? "0" + selectedTermin.getHours()
                    : selectedTermin.getHours()
                }:${
                  selectedTermin.getMinutes() <= 9
                    ? "0" + selectedTermin.getMinutes()
                    : selectedTermin.getMinutes()
                }:${
                  selectedTermin.getMinutes() <= 9
                    ? "0" + selectedTermin.getMinutes()
                    : selectedTermin.getMinutes()
                }.937Z`
              ),
              imeLokacije: imeLokacije ?? "",
              mbo: token ?? "111111111",
            };
            postRezervacija(rezervacija);
            closeFun(!close)
          }}
        >
          Rezerviraj
        </button>
        <button onClick={() => closeFun(!close)}>Zatvori</button>
      </FlexBox>
    </PopupContainer>
  );
}
