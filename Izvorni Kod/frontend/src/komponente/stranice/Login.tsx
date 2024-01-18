import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ErrorDiv,
  FormContainer2,
  OuterContainer,
  Toggle2,
  ToggleContainer2,
  TogglePanel,
} from "../stilovi";
import { useGetLoginInfo } from "./udice/useGetLoginInfo";
import useCookies from "./udice/useCookies";
import { useQueryClient } from "@tanstack/react-query";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(100).required(),
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loadingState, setLoadingState] = useState(true);

  const [prijava, setPrijava] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [fetchError, setFetchError] = useState(false);

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

  const { data: loginInfo, isError, isSuccess } = useGetLoginInfo(email);
  const queryClient = useQueryClient();
  const { setToken } = useCookies();

  const onSubmit = (data: FormData) => {
    setEmail(data.email);
    setPass(data.password);
    setPrijava(!prijava)
  };

  useEffect(() => {
    if (!loadingState && !invalidPassword) {
      if (loginInfo?.mail.endsWith("@hck.hr")) {
        setToken("admin");
      } else setToken(loginInfo ? loginInfo.mbo : "");
      console.log("set to " + loginInfo?.mbo);
      queryClient.invalidateQueries({ queryKey: ["getKorisnikIme"] });
      if (loginInfo !== undefined) {
        navigate("/lokacije");
      }
    }
    setFetchError(isError);
  }, [loadingState, loginInfo, navigate, queryClient, setToken, isError]);

  useEffect(() => {
    if (loginInfo?.lozinka === pass) {
      setInvalidPassword(false);
      queryClient.invalidateQueries({ queryKey: ["getKorisnikIme"] });
    } else {
      setInvalidPassword(true);
    }
    if (!!loginInfo) setLoadingState(false);
    if (!loadingState && !invalidPassword) {
      if (loginInfo?.mail.endsWith("@hck.hr")) {
        setToken("admin");
      } else setToken(loginInfo ? loginInfo.mbo : "");
      console.log("set to " + loginInfo?.mbo);
      queryClient.invalidateQueries({ queryKey: ["getKorisnikIme"] });
      if (loginInfo !== undefined) {
        navigate("/lokacije");
      }
    }
    setFetchError(isError);
  }, [isSuccess, prijava])

  return (
    <OuterContainer>
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
              {...register("password")}
            />
            <p> {errors.password?.message} </p>
            {invalidPassword && !loadingState && <ErrorDiv>Invalid password</ErrorDiv>}
            {fetchError && <ErrorDiv>Nepostojeći email</ErrorDiv>}
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
    </OuterContainer>
  );
}
