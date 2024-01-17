import React, { useState, useEffect } from "react";
import {
  Container,
  FormContainer,
  NoAccess,
  OuterContainer,
  Toggle,
  ToggleContainer,
  TogglePanel,
} from "../stilovi";
import useToken from "./udice/useCookies";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AkcijaSlanjeModel } from "../modeli";
import { api } from "../../api";
import { useMutation } from "@tanstack/react-query";
import formatDate from "./udice/useFormatDate";

interface FormData {
  imeLokacije: string;
  adresa: string;
  datumPoc: Date;
  datumKraj: Date;
}


export default function StvaranjeAkcija() {
  const token = useToken();
  const [sirina, setSirina] = useState(0);
  const [duzina, setDuzina] = useState(0);
 

  const fetchGeocode = async (adresa: string) => {
    try {
      const apiKey = '65a1ea265ab61960287828igq31138d'; // Zamijenite sa stvarnim API ključem
      const address = encodeURIComponent(adresa);
      const apiUrl = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`;

      const response = await fetch(apiUrl);
      const podaci = await response.json();
      console.log(podaci);
      if (podaci && podaci.length > 0) {
        setDuzina(podaci[0].lon);
        setSirina(podaci[0].lat);
      }
    } catch (error) {
      console.error('Došlo je do pogreške prilikom dohvaćanja podataka', error);
    }
  }; 
  const onSubmit = async (data: FormData) => {
    await fetchGeocode(data.adresa).then(() => {
    let akcija: AkcijaSlanjeModel = {
      idAkcija: 0,
      imeLokacije: data.imeLokacije,
      adresa: data.adresa,
      datumPoc: formatDate(data.datumPoc),
      datumKraj: formatDate(data.datumKraj),
      hitna: hitnaAkcija,
      krgrupa: krvnaGrupa,
      mail: "admin@hck.com",
      geo_sirina: sirina,
      geo_duzina: duzina,
    };
    postAkcija(akcija);})
  };

  const schema = yup.object().shape({
    imeLokacije: yup.string().required(),
    adresa: yup.string().required(),
    datumPoc: yup.date().required(),
    datumKraj: yup.date().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate: postAkcija } = useMutation({
    mutationFn: (akcija: AkcijaSlanjeModel) => {
      return api.post("/akcija/create", akcija);
    },
  });

  const [hitnaAkcija, setHitnaAkcija] = useState(false);
  const [krvnaGrupa, setKrvnaGrupa] = useState<
    "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-" | undefined
  >();

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setHitnaAkcija(e.target.checked);
  };
  if (token.token === "admin")
    return (
      <OuterContainer>
        <Container>
          <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                id="naziv"
                placeholder="Naziv lokacije..."
                {...register("imeLokacije")}
              />
              <input
                type="text"
                id="adresa"
                placeholder="Adresa..."
                {...register("adresa")}
              />
              <input
                type="date"
                id="pocetak"
                placeholder="Datum početka..."
                {...register("datumPoc")}
              />
              <input
                type="date"
                id="kraj"
                placeholder="Datum kraja..."
                {...register("datumKraj")}
              />
              <br />
              <input
                type="checkbox"
                name="hitna"
                value="hitna"
                onChange={handleCheckboxChange}
              />
              Hitna akcija
              {hitnaAkcija && (
                <label>
                  Krvna grupa:{" "}
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
              )}
              <br />
              <br />
              <button type="submit">Stvori akciju</button>
            </form>
          </FormContainer>

          <ToggleContainer>
            <Toggle>
              <TogglePanel>
                <h1>Nova akcija!</h1>
                <p>
                  Unesite potrebne podatke za stvaranje<br></br> željene nove
                  akcije doniranja krvi Crvenog križa
                </p>
              </TogglePanel>
            </Toggle>
          </ToggleContainer>
        </Container>
      </OuterContainer>
    );
  else
    return (
      <>
        <NoAccess>Nemate pristup ovoj web lokaciji!</NoAccess>
      </>
    );
}
