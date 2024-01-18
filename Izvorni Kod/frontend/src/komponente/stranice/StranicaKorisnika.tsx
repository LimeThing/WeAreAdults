import React, { useEffect, useState } from "react";
import useCookies from "./udice/useCookies";
import { api } from "../../api";
import { useGetKorisnikInfo } from "./udice/useGetKorisnikInfo";
import { useGetKorisnikRezervacija } from "./udice/useGetKorisnikRezervacija";
import formatDate, { formatTime } from "./udice/useFormatDate";
import { KorisnikModel } from "../modeli";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormData {
  firstName: string;
  lastName: string;
  adresa: string;
}

export default function StranicaKorisnika() {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    adresa: yup.string().required(),
  });

  const { token } = useCookies();
  const { data: korisnikInfos, isSuccess } = useGetKorisnikInfo(token || "");
  const { data: reservations = [] } = useGetKorisnikRezervacija(token || "");

  const [korisnik, setKorisnik] = useState(false);

  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [oib, setOib] = useState("");
  const [mbo, setMbo] = useState("");
  const [spol, setSpol] = useState("");
  const [dob, setDob] = useState(0);
  const [krGrupa, setKrGrupa] = useState("");
  const [mjStan, setMjStan] = useState("");
  const [favkbc, setFavkbc] = useState("");
  const [favkbcNew, setFavkbcNew] = useState("");

  const [numberOfDonations, setNumberOfDonations] = useState(0);
  const [moreToDo, setMoreToDo] = useState(0);

  const futureReservations = reservations.filter(
    (reservation) => new Date(reservation.vrijemePoc) >= new Date()
  );

  const isEligibleForFreeHealthcare =
    (spol === "MUŠKO" && numberOfDonations >= 35) ||
    (spol === "ŽENSKO" && numberOfDonations >= 50);

  useEffect(() => {
    if (korisnikInfos) {
      const { ime, prezime, oib, mbo, spol, dob, krgrupa, mjstan, favkbc } =
        korisnikInfos;
      setKorisnik(true);
      setIme(ime);
      setPrezime(prezime);
      setOib(oib);
      setMbo(mbo);
      setSpol(spol);
      setDob(dob);
      setKrGrupa(krgrupa);
      setMjStan(mjstan);
      setFavkbc(favkbc);

      setNumberOfDonations(reservations.length - futureReservations.length);

      if (spol === "Muško") {
        setMoreToDo(50 - numberOfDonations);
      }

      if (spol === "Žensko") {
        setMoreToDo(35 - numberOfDonations);
      }
    }
  }, [isSuccess, futureReservations, numberOfDonations]);

  const queryClient = useQueryClient();

  const [isUrediPodatkeOpen, setUrediPodatkeOpen] = useState(false);
  const openUrediPodatke = () => setUrediPodatkeOpen(true);
  const closeUrediPodatkeModal = () => {
    setUrediPodatkeOpen(false);
    queryClient.invalidateQueries({ queryKey: ["getKorisnikInfo"] });
  };

  const { mutate: deleteRezervacija } = useMutation({
    mutationFn: (rezervacijaId: number) => {
      return api.delete("/rezervacija/delete/" + rezervacijaId);
    },
  });

  const { mutate: postKorisnik } = useMutation({
    mutationFn: (korisnik2: KorisnikModel) => {
      return api.put("/korisnik/edit/" + korisnik2.mbo, korisnik2);
    },
  });

  const onSubmit = (data: FormData) => {
    let noviPodatci: KorisnikModel = {
      mbo: mbo,
      oib: oib,
      ime: data.firstName,
      prezime: data.lastName,
      spol: spol as "Žensko" | "Muško",
      dob: dob,
      krgrupa: krGrupa as
        | "A+"
        | "A-"
        | "B+"
        | "B-"
        | "AB+"
        | "AB-"
        | "0+"
        | "0-",
      mjstan: data.adresa,
      favkbc: favkbcNew,
      verificiran: false,
    };
    postKorisnik(noviPodatci);
  };

  const handleOtkažiTermin = () => {
    deleteRezervacija(futureReservations[0].idRezervacija);
  };

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  return (
    <div>
      <div className="userContainer">
        <h1>Vaše informacije</h1>
        {korisnik && (
          <div className="userContainerData">
            <p>
              Ime: <span className="podatci">{ime}</span>
            </p>
            <p>
              Prezime: <span className="podatci">{prezime}</span>
            </p>
            <p>
              OIB: <span className="podatci">{oib}</span>
            </p>
            <p>
              MBO: <span className="podatci">{mbo}</span>
            </p>
            <p>
              Spol: <span className="podatci">{spol}</span>
            </p>
            <p>
              Dob: <span className="podatci">{dob}</span>
            </p>
            <p>
              Krvna grupa: <span className="podatci">{krGrupa}</span>
            </p>
            <p>
              Mjesto stanovanja: <span className="podatci">{mjStan}</span>
            </p>
            <p>
              Preferirani KBC: <span className="podatci">{favkbc}</span>
            </p>
            <button onClick={openUrediPodatke}>Uredi podatke</button>
          </div>
        )}
        {isUrediPodatkeOpen && (
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <h2>Uredi podatke</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>Ime:</label>
                  <input
                    type="text"
                    id="ime"
                    defaultValue={ime}
                    {...register("firstName")}
                  />
                  <label>Prezime:</label>
                  <input
                    type="text"
                    id="prezime"
                    defaultValue={prezime}
                    {...register("lastName")}
                  />
                  <label>Mjesto stanovanja:</label>
                  <input
                    type="text"
                    id="mjStan"
                    defaultValue={mjStan}
                    {...register("adresa")}
                  />
                  <label>
                    Preferirani KBC:
                    <select
                  name="favKBC" id="favKBC"
                  onChange={(e) => setFavkbcNew(e.target.value)}
                  value={favkbcNew}
                  defaultValue={favkbc}
                >
                      <option
                        value="Hrvatski zavod za transfuzijsku medicinu Zagreb"
                        onSelect={() =>
                          setFavkbc(
                            "Hrvatski zavod za transfuzijsku medicinu Zagreb"
                          )
                        }
                      >
                        HZTM Zagreb
                      </option>
                      <option
                        value="KBC Osijek"
                        onSelect={() => setFavkbc("KBC Osijek")}
                      >
                        KBC Osijek
                      </option>
                      <option
                        value="KBC Rijeka"
                        onSelect={() => setFavkbc("KBC Rijeka")}
                      >
                        KBC Rijeka
                      </option>
                      <option
                        value="KBC Split"
                        onSelect={() => setFavkbc("KBC Split")}
                      >
                        KBC Split
                      </option>
                      <option
                        value="OB Dubrovnik"
                        onSelect={() => setFavkbc("OB Dubrovnik")}
                      >
                        OB Dubrovnik
                      </option>
                      <option
                        value="OB Varaždin"
                        onSelect={() => setFavkbc("OB Varaždin")}
                      >
                        OB Varaždin
                      </option>
                      <option
                        value="OB Zadar"
                        onSelect={() => setFavkbc("OB Zadar")}
                      >
                        OB Zadar
                      </option>
                    </select>
                  </label>
                  <button type="submit">Spremi promjene</button>
                </form>
                <button onClick={closeUrediPodatkeModal}>Zatvori</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="userContainer">
        <h1>Vaše rezervacije</h1>
        <div className="userContainerData">
          {futureReservations.length === 0 && (
            <h4>Trenutno nemate rezerviranih termina!</h4>
          )}
          {futureReservations.length > 0 && (
            <div>
              <ul>
                {futureReservations.map((reservation) => (
                  <li key={reservation.idRezervacija}>
                    <p>
                      Lokacija: {reservation.imeLokacije}
                      <br></br> Vrijeme:
                      {" " +
                        formatDate(reservation.vrijemePoc) +
                        "  " +
                        formatTime(reservation.vrijemePoc)}
                    </p>
                  </li>
                ))}
              </ul>
              <button onClick={handleOtkažiTermin}>Otkaži termin</button>
            </div>
          )}
        </div>
      </div>

      <div className="userContainer">
        <h1>Vaša postignuća</h1>
        <div className="userContainerData">
          <p>
            Do sad ste dali krvi{" "}
            <span className="brojcek">{numberOfDonations}</span> puta!
          </p>
          {isEligibleForFreeHealthcare ? (
            <div>
              <p>Čestitke!</p>
              <p>
                Ostvarili ste pravo na besplatno dopunsko zdravstveno osiguranje
                HZZO-a!
              </p>
            </div>
          ) : (
            <div>
              <p>
                Još Vas samo <span className="brojcek">{moreToDo}</span> davanja
                krvi dijeli od besplatnog dopunskog zdravstvenog osiguranja
                HZZO-a!
              </p>
            </div>
          )}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
