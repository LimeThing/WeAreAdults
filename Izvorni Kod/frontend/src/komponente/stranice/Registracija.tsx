import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  FormContainer,
  OuterContainer,
  Toggle,
  ToggleContainer,
  TogglePanel,
} from "../stilovi";
import { KorisnikModel, LoginInfoModel } from "../modeli";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  bloodType: string;
  adresa: string;
  MBO: string;
  oib: string;
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
    adresa: yup.string().required(),
    MBO: yup.string().length(9).required(),
    oib: yup.string().length(11).required(),
  });

  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    navigate("/Login");
  };

  const [prviDio, setPrviDio] = useState(true);
  const [drugiDio, setDrugiDio] = useState(false);

  const [krvnaGrupa, setKrvnaGrupa] = useState<
    "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-"
  >("AB+");
  const [spol, setSpol] = useState<"Muško" | "Žensko">("Muško");
  const [favkbc, setFavkbc] = useState<
    "Hrvatski zavod za transfuzijsku medicinu Zagreb"
    | "KBC Osijek"
    | "KBC Rijeka"
    | "KBC Split"
    | "OB Dubrovnik"
    | "OB Varaždin"
    | "OB Zadar"
  >("Hrvatski zavod za transfuzijsku medicinu Zagreb");

  const handleDaljeButtonClick = () => {
    setPrviDio(false);
    setDrugiDio(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate: postKorisnik } = useMutation({
    mutationFn: (korisnik: KorisnikModel) => {
      return api.post("/korisnik/create", korisnik);
    },
  });

  const { mutate: postLoginInfo } = useMutation({
    mutationFn: (loginInfo: LoginInfoModel) => {
      return api.post("/loginInfo/create/", loginInfo);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    let korisnik: KorisnikModel = {
      mbo: data.MBO,
      oib: data.oib,
      ime: data.firstName,
      prezime: data.lastName,
      spol: spol,
      dob: data.age,
      krgrupa: krvnaGrupa,
      mjstan: data.adresa,
      favkbc: favkbc,
      verificiran: false,
    };
    postKorisnik(korisnik);
    let login: LoginInfoModel = {
      mail: data.email,
      lozinka: data.password,
      mbo: data.MBO,
    };
    postLoginInfo(login);
    alert("Hvala na registraciji! Procekajte da Vas admin verificira.");
  };

  return (
    <OuterContainer>
      <Container>
        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            {prviDio === true && (
              <>
                <span>
                  Unesite tražene podatke<br></br>i izradite korisnički račun
                </span>
                <br></br>
                <input
                  type="text"
                  placeholder="Ime..."
                  {...register("firstName")}
                />
                <input
                  type="text"
                  placeholder="Prezime..."
                  {...register("lastName")}
                />
                <input
                  type="text"
                  placeholder="Email..."
                  {...register("email")}
                />
                <input
                  type="password"
                  placeholder="Lozinka..."
                  {...register("password")}
                />
                <input type="oib" placeholder="OIB..." {...register("oib")} />
                <p> {errors.password?.message} </p>
                <button type="submit" onClick={handleDaljeButtonClick}>
                  Dalje
                </button>
              </>
            )}

            {drugiDio === true && (
              <>
                <span>
                  Unesite još par podataka i<br></br>završite izradu korisničkog
                  računa
                </span>
                <br></br>
                <label>
                  Spol:
                  <select name="spol" id="spol">
                    <option value="Žensko" onSelect={() => setSpol("Žensko")}>
                      Žensko
                    </option>
                    <option value="Muško" onSelect={() => setSpol("Muško")}>
                      Muško
                    </option>
                  </select>
                </label>
                <label>
                  Krvna grupa:
                  <select name="krvna-grupa" id="krvna-grupa">
                    <option value="A+" onSelect={() => setKrvnaGrupa("A+")}>
                      A+
                    </option>
                    <option value="B+" onSelect={() => setKrvnaGrupa("B+")}>
                      B+
                    </option>
                    <option value="AB+" onSelect={() => setKrvnaGrupa("AB+")}>
                      AB+
                    </option>
                    <option value="0+" onSelect={() => setKrvnaGrupa("0+")}>
                      0+
                    </option>
                    <option value="A-" onSelect={() => setKrvnaGrupa("A-")}>
                      A-
                    </option>
                    <option value="B-" onSelect={() => setKrvnaGrupa("B-")}>
                      B-
                    </option>
                    <option value="AB-" onSelect={() => setKrvnaGrupa("AB-")}>
                      AB-
                    </option>
                    <option value="0-" onSelect={() => setKrvnaGrupa("0-")}>
                      0-
                    </option>
                  </select>
                </label>
                <input
                  type="number"
                  placeholder="Dob..."
                  {...register("age")}
                />
                <label>
                  KBC:
                  <select name="favKBC" id="favKBC">
                    <option value="Hrvatski zavod za transfuzijsku medicinu Zagreb" onSelect={() => setFavkbc("Hrvatski zavod za transfuzijsku medicinu Zagreb")}>
                    HZTM Zagreb
                    </option><option value="KBC Osijek" onSelect={() => setFavkbc("KBC Osijek")}>KBC Osijek
                    </option>
                    <option value="KBC Rijeka" onSelect={() => setFavkbc("KBC Rijeka")}>KBC Rijeka
                    </option>
                    <option value="KBC Split" onSelect={() => setFavkbc("KBC Split")}>KBC Split
                    </option>
                    <option value="OB Dubrovnik" onSelect={() => setFavkbc("OB Dubrovnik")}>OB Dubrovnik
                    </option>
                    <option value="OB Varaždin" onSelect={() => setFavkbc("OB Varaždin")}>OB Varaždin
                    </option>
                    <option value="OB Zadar" onSelect={() => setFavkbc("OB Zadar")}>OB Zadar
                    </option>
                  </select>
                </label>
                <input
                  type="text"
                  placeholder="Adresa..."
                  {...register("adresa")}
                />
                <input type="text" placeholder="MBO..." {...register("MBO")} />
                <button type="submit">Registriraj se</button>

                {/* //TODO dodati error messages lijepe */}
              </>
            )}
          </form>
        </FormContainer>

        <ToggleContainer>
          <Toggle>
            <TogglePanel>
              <h1>Dobrodošli natrag!</h1>
              <p>Prijavite se za korištenje svih mogućnosti</p>
              <button id="login" onClick={handleLoginButtonClick}>
                Prijavi se
              </button>
            </TogglePanel>
          </Toggle>
        </ToggleContainer>
      </Container>
    </OuterContainer>
  );
}
