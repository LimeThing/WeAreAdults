import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container, FormContainer, OuterContainer, Toggle, ToggleContainer, TogglePanel } from "../stilovi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  bloodType: string;
  preferedKBC: string;
  MBO: string;
}

export default function Registration() {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required(),
    gender: yup.string().required(),
    age: yup.number().integer().min(18).max(65).required(),
    bloodType: yup.string().required(),
    preferedKBC: yup.string().required(),
    MBO: yup.string().length(9).required(),
  });

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate('/Login');
  };

  const[prviDio, setPrviDio] = useState(true);
  const[drugiDio, setDrugiDio] = useState(false);

  const handleDaljeButtonClick = () => {
      setPrviDio(false); 
      setDrugiDio(true);
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      {prviDio === true &&
    <OuterContainer>
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Unesite tražene podatke<br></br>i izradite korisnički račun</span>
          <br></br>
          <input type="text" placeholder="Ime..." {...register("firstName")} />
          <input type="text" placeholder="Prezime..." {...register("lastName")} />
          <input type="text" placeholder="Email..." {...register("email")} />
          <input
            type="password"
            placeholder="Lozinka..."
            {...register("password")}
          />
          <p> {errors.password?.message} </p>
          <button type="submit" onClick={handleDaljeButtonClick}>Dalje</button>
          {/*na klik ovog gumba otvara se nova forma: dob, spol, krvna grupa, preferirani KBC*/}
          {/* <input type="submit"/> */}
        </form>
      </ FormContainer>

      <ToggleContainer>
        <Toggle>
          <TogglePanel>
            <h1>Dobrodošli natrag!</h1>
            <p>Prijavite se za korištenje svih mogućnosti</p>
            <button id="login" onClick={handleLoginButtonClick}>Prijavi se</button>
          </ TogglePanel>
        </ Toggle>
      </ ToggleContainer>
    </ Container>
    </OuterContainer>
}

{drugiDio === true &&
  <div className="outerContainer">
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Unesite još par podataka i<br></br>završite izradu korisničkog računa</span>
          <br></br>
          <input type="text" placeholder="Spol..." {...register("gender")} />
          <input type="number" placeholder="Dob..." {...register("age")} />
          <input type="text" placeholder="KBC..." {...register("preferedKBC")} />
          <input type="text" placeholder="MBO..." {...register("MBO")} />
          <button type="submit">Registriraj se</button>
          
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle left">
            <h1>Dobrodošli natrag!</h1>
            <p>Prijavite se za korištenje svih mogućnosti</p>
            <button id="login" onClick={handleLoginButtonClick}>Prijavi se</button>
          </div>
        </div>
      </div>
    </div>
    </div>


}


    </div>
  );
};