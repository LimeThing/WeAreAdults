import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { ListItem, Name, VerifyButton } from "../stilovi";
import { KorisnikModel } from "../modeli";



export default function Verifikacija() {
  const [people, setPeople] = useState<KorisnikModel[]>([]);

  const handleVerify = (mbo: string) => {
    const updatedPeople = people.filter((person) => person.mbo !== mbo);
    setPeople(updatedPeople);
  };

  const fetchKorisnik = (): Promise<KorisnikModel[]> =>
    api.get("/korisnik/get_all").then((response: any) => response.data);

  const { isLoading, data } = useQuery<KorisnikModel[]>({
    queryKey: ["getKorisnik"],
    queryFn: fetchKorisnik,
  })

  useEffect(() => {
    setPeople(data ? data : [])
  }, [data]);

  if (isLoading) return <></>;
  else
    return (
      <div>
        <ul>
          {people.map((person) => (
            <ListItem key={person.mbo}>
              <Name>{`MBO: ${person.mbo}`}</Name>
              <Name>{`Ime: ${person.ime}`}</Name>
              <Name>{`Prezime: ${person.prezime}`}</Name>
              <VerifyButton onClick={() => handleVerify(person.mbo)}>
                Verify!
              </VerifyButton>
            </ListItem>
          ))}
        </ul>
      </div>
    );
}
