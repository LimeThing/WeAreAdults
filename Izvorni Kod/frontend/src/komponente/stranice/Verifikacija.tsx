import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../api';
import { ListItem, Name, VerifyButton } from '../stilovi';


interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

type KorisnikType = {
  ime: string
  prezime: string
}

export default function Verifikacija() {
    const [people, setPeople] = useState<Person[]>([
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ]);

  const handleVerify = (id: number) => {
    const updatedPeople = people.filter(person => person.id !== id);
    setPeople(updatedPeople);
  };



  const fetchKorisnik = (): Promise<KorisnikType[]> =>
  api.get('/korisnik/get_all').then((response: any) => response.data)

  const {data} = useQuery({
    queryKey: "getKorisnik",
  queryFn: fetchKorisnik  })


  return (
    <div>
      <p>{data ? data.toString() : " "}</p>
      <ul>
        {people.map(person => (
          <ListItem key={person.id}>
            <Name>{`ID: ${person.id}`}</Name>
            <Name>{`Name: ${person.firstName}`}</Name>
            <Name>{`Last Name: ${person.lastName}`}</Name>
            <VerifyButton onClick={() => handleVerify(person.id)}>Verify!</VerifyButton>
          </ListItem>
        ))}
      </ul>
    </div>
  );
}
