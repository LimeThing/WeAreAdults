import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import {
  FlexBox,
  ListItem,
  Name,
  NoAccess,
  OverFlowDiv,
  PersonalInformation,
  VerifyButton,
} from "../stilovi";
import { KorisnikModel } from "../modeli";
import useToken from "./udice/useCookies";

export default function Verifikacija() {
  const [people, setPeople] = useState<KorisnikModel[]>([]);
  const queryClient = useQueryClient();
  const token = useToken();

  const fetchKorisnik = (): Promise<KorisnikModel[]> =>
    api
      .get("/korisnik/get_all_unverified")
      .then((response: any) => response.data);

  const { isLoading, data } = useQuery<KorisnikModel[]>({
    queryKey: ["getKorisnik"],
    queryFn: fetchKorisnik,
  });

  const { mutate: verifyKorisnik } = useMutation({
    mutationFn: (mbo: string) => {
      return api.patch("/korisnik/verify/" + mbo);
    },
  });

  const { mutate: deleteKorisnik } = useMutation({
    mutationFn: (mbo: string) => {
      return api.delete("/korisnik/delete/" + mbo);
    },
  });

  const handleVerify = (mbo: string) => {
    verifyKorisnik(mbo);
    queryClient.invalidateQueries({ queryKey: ["getKorisnik"] });
  };

  const handleDelete = (mbo: string) => {
    deleteKorisnik(mbo);
    queryClient.invalidateQueries({ queryKey: ["getKorisnik"] });
  }

  useEffect(() => {
    setPeople(data ? data : []);
  }, [data]);

  if (isLoading) return <></>;
  else if (token.token === "admin")
    return (
      <div>
        <br></br>
        <OverFlowDiv $width="50rem">
          <ul>
            {people.map((person, index) => (
              <ListItem key={person.mbo}>
                <PersonalInformation>
                  <Name>{`MBO: ${person.mbo}`}</Name>
                  <Name>{`OIB: ${person.oib}`}</Name>
                  <Name>{`Ime: ${person.ime}`}</Name>
                  <Name>{`Prezime: ${person.prezime}`}</Name>
                  <Name>{`Spol: ${person.spol}`}</Name>
                </PersonalInformation>
                <PersonalInformation>
                  <Name>{`Dob: ${person.dob}`}</Name>
                  <Name>{`Krvna grupa: ${person.krgrupa}`}</Name>
                  <Name>{`Mjesto stanovanja: ${person.mjstan}`}</Name>
                  <Name>{`KBC: ${person.favkbc}`}</Name>
                </PersonalInformation>
                <PersonalInformation>
                <FlexBox $direction="column">
                  <VerifyButton onClick={() => handleVerify(person.mbo)}>
                    Verificiraj
                  </VerifyButton>
                  <VerifyButton
                    onClick={() => handleDelete(person.mbo)}
                    $delete
                  >
                    Obriši
                  </VerifyButton>
                </FlexBox>
                </PersonalInformation>
                {((index + 1) !== people.length) && <hr style={{ width: "100%" }}></hr>}
              </ListItem>
            ))}
          </ul>
        </OverFlowDiv>
      </div>
    );
    else return (
    <>
    <NoAccess>Nemate pristup ovoj web lokaciji!</NoAccess>
    </>
    )
}
