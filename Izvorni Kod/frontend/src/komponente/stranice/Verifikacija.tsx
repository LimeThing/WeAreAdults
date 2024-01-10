import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { ListItem, Name, OverFlowDiv, PersonalInformation, VerifyButton } from "../stilovi";
import { KorisnikModel } from "../modeli";



export default function Verifikacija() {
  const [people, setPeople] = useState<KorisnikModel[]>([]);
  const queryClient = useQueryClient();

  const fetchKorisnik = (): Promise<KorisnikModel[]> =>
    api.get("/korisnik/get_all_unverified").then((response: any) => response.data);

  const { isLoading, data } = useQuery<KorisnikModel[]>({
    queryKey: ["getKorisnik"],
    queryFn: fetchKorisnik,
  })

  const {mutate: verifyKorisnik} = useMutation({
    mutationFn: (mbo: string) => {
      return api.patch('/korisnik/verify/' + mbo)
    }
  })

  const handleVerify = (mbo: string) => {
    verifyKorisnik(mbo);
    queryClient.invalidateQueries({queryKey: ["getKorisnik"]});
  };

  useEffect(() => {
    setPeople(data ? data : [])
  }, [data]);

  if (isLoading) return <></>;
  else
    return (
      <div>
        <br></br>
        <OverFlowDiv $width="50rem">
        <ul>
          {people.map((person) => (
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
              <VerifyButton onClick={() => handleVerify(person.mbo)}>
                Verificiraj
              </VerifyButton>
              <hr style={{ width: "100%"}}></hr>
            </ListItem>
           
          ))}
        </ul>
         </OverFlowDiv>
      </div>
    );
}
