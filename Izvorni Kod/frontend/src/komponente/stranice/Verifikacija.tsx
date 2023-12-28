import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";
import { ListItem, Name, VerifyButton } from "../stilovi";

type KorisnikType = {
  mbo: string;
  oib: string;
  ime: string;
  prezime: string;
  spol: "MUŠKO" | "ŽENSKO"
  dob: number;
  krgrupa: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-";
  mjstan: string;
  favkbc: string;
};

export default function Verifikacija() {
  const [people, setPeople] = useState<KorisnikType[]>([]);

  const handleVerify = (mbo: string) => {
    const updatedPeople = people.filter((person) => person.mbo !== mbo);
    setPeople(updatedPeople);
  };

  const fetchKorisnik = async () => {
    const responce = api.get("/korisnik/get_all")
    setPeople(responce);
  }


 
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
