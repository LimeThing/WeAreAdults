import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { api } from "../api";
import {
  FlexBox,
  Input,
  ListItem,
  Name,
  PersonalInformation,
  VerifyButton,
} from "./stilovi";
import * as yup from "yup";
import { AkcijaModel, AkcijaSlanjeModel } from "./modeli";
import formatDate from "./stranice/udice/useFormatDate";

type PromjenaAkcijePopupProps = {
  closeFun: React.Dispatch<React.SetStateAction<boolean>>;
  close: boolean;
  idAkcije: number;
  setAkcije: React.Dispatch<React.SetStateAction<number>>;
  akcija: AkcijaModel;
};

interface FormData {
  Lokacija?: string | undefined;
  Adresa?: string | undefined;
  Početak?: Date | undefined;
  Kraj?: Date | undefined;
}

export default function PromjenaAkcijePopup({
  closeFun,
  close,
  idAkcije,
  setAkcije,
  akcija,
}: PromjenaAkcijePopupProps) {
  const queryClient = useQueryClient();

  const sirinaRef = useRef(akcija.geo_sirina);
  const duzinaRef = useRef(akcija.geo_duzina);
  const [hitnaAkcija, setHitnaAkcija] = useState(akcija.hitna);
  const [krvnaGrupa, setKrvnaGrupa] = useState(akcija.krgrupa);

  const [arhiviraj, setArhiviraj] = useState(false);

  const fetchGeocode = async (adresa: string) => {
    try {
      const apiKey = "65a1ea265ab61960287828igq31138d";
      const address = encodeURIComponent(adresa);
      const apiUrl = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`;

      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("Response:", response);

      const podaci = await response.json();
      console.log("Geocoding Data:", podaci);

      if (podaci && podaci.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1100));
        duzinaRef.current = podaci[0].lon;
        sirinaRef.current = podaci[0].lat;
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log(sirinaRef.current, duzinaRef.current);
    if (data.Adresa) await fetchGeocode(data.Adresa);
    console.log(sirinaRef.current + " " + duzinaRef.current);
    console.log(arhiviraj);
    let kraj = new Date(
      !data.Kraj ? akcija.datumKraj : data.Kraj ?? akcija.datumKraj
    );
    if (arhiviraj) {
      kraj = new Date();
      kraj.setDate(kraj.getDate() - 1);
    }
    let updatedAkcija: AkcijaSlanjeModel = {
      idAkcija: akcija.idAkcija,
      imeLokacije:
        data.Lokacija === ""
          ? akcija.imeLokacije
          : data.Lokacija ?? akcija.imeLokacije,
      adresa: data.Adresa === "" ? akcija.adresa : data.Adresa ?? akcija.adresa,
      datumPoc: formatDate(
        new Date(
          !data.Početak ? akcija.datumPoc : data.Početak ?? akcija.datumPoc
        )
      ),
      datumKraj: formatDate(kraj),
      hitna: hitnaAkcija,
      krgrupa: krvnaGrupa,
      mail: akcija.mail,
      geo_sirina: sirinaRef.current,
      geo_duzina: duzinaRef.current,
    };
    mijenjajAkciju(updatedAkcija);
    closeFun(!close);
    setAkcije(-1);
  };

  const schema = yup.object().shape({
    Lokacija: yup.string(),
    Adresa: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate: mijenjajAkciju } = useMutation({
    mutationFn: (akcija: AkcijaSlanjeModel) => {
      return api.put("/akcija/edit/" + akcija.idAkcija, akcija);
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["getAkcija"] });
    }
  });

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setHitnaAkcija(e.target.checked);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ListItem key={idAkcije}>
        <PersonalInformation>
          <Name>
            <Input
              type="text"
              defaultValue={akcija.imeLokacije}
              {...register("Lokacija")}
            />
          </Name>
          <Name>
            <Input
              type="text"
              defaultValue={akcija.adresa}
              {...register("Adresa")}
            />
          </Name>
        </PersonalInformation>
        <PersonalInformation>
          <Name>
            <Input
              type="date"
              defaultValue={formatDate(akcija.datumPoc)}
              {...register("Početak")}
            />
          </Name>
          <Name>
            <Input
              type="date"
              defaultValue={formatDate(akcija.datumKraj)}
              {...register("Kraj")}
            />
          </Name>
          <Name>
            <Input
              type="checkbox"
              checked={hitnaAkcija}
              onChange={handleCheckboxChange}
            />{" "}
            hitna akcija
          </Name>
          <Name>
            {hitnaAkcija && (
              <label>
                Krvna grupa:{" "}
                <select
                  name="krvna-grupa"
                  id="krvna-grupa"
                  onChange={(e) => setKrvnaGrupa(e.target.value as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "0+" | "0-" | undefined)}
                  value={krvnaGrupa}
                >
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
          </Name>
        </PersonalInformation>
        <PersonalInformation>
          <FlexBox $direction="column" style={{ gap: "0" }}>
            <VerifyButton type="submit" onClick={() => setArhiviraj(false)}>
              Spremi
            </VerifyButton>
            <VerifyButton type="submit" onClick={() => setArhiviraj(true)}>
              Arhiviraj
            </VerifyButton>
            <VerifyButton
              $delete
              onClick={() => {
                closeFun(!close);
                setAkcije(-1);
                setArhiviraj(false);
              }}
            >
              Zatvori
            </VerifyButton>
          </FlexBox>
        </PersonalInformation>
        <p>
          {errors.Lokacija?.message}
          {errors.Adresa?.message}
          {errors.Početak?.message}
          {errors.Kraj?.message}
        </p>
        <hr style={{ width: "100%" }}></hr>
      </ListItem>
    </form>
  );
}
