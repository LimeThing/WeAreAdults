import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormContainer2,
  OuterContainer,
  Toggle2,
  ToggleContainer2,
  TogglePanel,
} from "../stilovi";
import { useGetLoginInfo } from "./udice/useGetLoginInfo";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(10).required(),
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleRegisterButtonClick = () => {
    navigate("/Registracija");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const {data} = useGetLoginInfo(email);

  const onSubmit = (data: FormData) => {
    console.log(data);
    setEmail(data.email);
  };

  return (
    <><h1>{data?.mbo}</h1><OuterContainer>
      <>
        <Container>
          <FormContainer2>


            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Dobro došli!</h1>
              <br></br>
              <span>Unesite svoj email i lozinku</span>
              <br></br>

              <input type="text" placeholder="Email..." {...register("email")} />
              <p> {errors.email?.message} </p>
              <input
                type="password"
                placeholder="Password..."
                {...register("password")} />
              <p> {errors.password?.message} </p>
              <button type="submit">Prijavi se</button>
            </form>
          </FormContainer2>

          <ToggleContainer2>
            <Toggle2>
              <TogglePanel $right>
                <h1>Prvi put?</h1>
                <p>Unesite svoje podatke i napravite korisnički račun</p>
                <button id="register" onClick={handleRegisterButtonClick}>
                  Registriraj se
                </button>
              </TogglePanel>
            </Toggle2>
          </ToggleContainer2>
        </Container>
      </>
    </OuterContainer></>
  );
}
