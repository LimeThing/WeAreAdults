import React, { useState } from 'react';
import { ListItem, Name, VerifyButton } from '../stilovi';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
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

  return (
    <div>
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
