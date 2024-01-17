import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import {
  ListItem,
  Name,
  NoAccess,
  OverFlowDiv,
  PersonalInformation,
  VerifyButton,
} from "../stilovi";
import { AkcijaModel } from "../modeli";
import PromjenaAkcijePopup from "../PromjenaAkcijePopup";
import useToken from "./udice/useCookies";

export default function Akcije() {
  const token = useToken();
  const [akcije, setAkcije] = useState<AkcijaModel[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [aktualnaAkcija, setAktualnaAkcija] = useState(-1);

  const fetchAkcija = (): Promise<AkcijaModel[]> =>
    api.get("/akcija/get_all/").then((response: any) => response.data);

  const { isLoading, data } = useQuery<AkcijaModel[]>({
    queryKey: ["getAkcija"],
    queryFn: fetchAkcija,
  });

  useEffect(() => {
    setAkcije(data ? data : []);
  }, [data]);

  if (isLoading) return <></>;
  else if (token.token === 'admin')
    return (
      <>
        <br />
        <OverFlowDiv $width="50rem">
          <ul>
            {akcije.map((akcija, index) => (
              <>
                {aktualnaAkcija !== akcija.idAkcija ? (
                  <ListItem key={akcija.idAkcija}>
                    <PersonalInformation>
                      <Name>{`ID: ${akcija.idAkcija}`}</Name>
                      <Name>{`Lokacija: ${akcija.imeLokacije}`}</Name>
                      <Name>{`Adresa: ${akcija.adresa}`}</Name>
                    </PersonalInformation>
                    <PersonalInformation>
                      <Name>{`Početak: ${akcija.datumPoc}`}</Name>
                      <Name>{`Kraj: ${akcija.datumKraj}`}</Name>
                      {akcija.hitna &&
                      <>
                      <Name>{`Hitna akcija`}</Name>
                      <Name>{`Krvna grupa: ${akcija.krgrupa}`}</Name>
                      </>}
                    </PersonalInformation>
                    <PersonalInformation>
                      <VerifyButton
                        onClick={() => {
                          setShowPopup(!showPopup);
                          setAktualnaAkcija(akcija.idAkcija);
                        }}
                      >
                        Promijeni!
                      </VerifyButton>
                    </PersonalInformation>
                    {index + 1 !== akcije.length && (
                      <hr style={{ width: "100%" }}></hr>
                    )}
                  </ListItem>
                ) : (
                  <>
                    {showPopup && (
                      <PromjenaAkcijePopup
                        closeFun={setShowPopup}
                        close={showPopup}
                        idAkcije={akcija.idAkcija}
                        setAkcije={setAktualnaAkcija}
                        akcija={akcija}
                      />
                    )}{" "}
                  </>
                )}
              </>
            ))}
          </ul>
        </OverFlowDiv>
      </>
    );
    else return (
    <>
    <NoAccess>Nemate pristup ovoj web lokaciji!</NoAccess>
    </>
    )
}
