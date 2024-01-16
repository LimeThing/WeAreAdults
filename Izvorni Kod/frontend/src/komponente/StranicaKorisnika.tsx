import React, { useEffect, useState } from "react";
import useCookies from "./stranice/udice/useCookies";
import { api } from "../api";
import { useGetKorisnikInfo } from "./stranice/udice/useGetKorisnikInfo";
import { useGetKorisnikRezervacija } from "./stranice/udice/useGetKorisnikRezervacija";
import  formatDate  from "./stranice/udice/useFormatDate";






export default function StranicaKorisnika() {

    const { token, setToken } = useCookies();
    const { data } = useGetKorisnikInfo(token || "");
    const { data: reservations = [] } = useGetKorisnikRezervacija(token || "");


    const[korisnik, setKorisnik] = useState(false);

    const [ime, setIme] = useState("");
    const [prezime, setPrezime] = useState("");
    const [oib, setOib] = useState("");
    const [mbo, setMbo] = useState("");
    const [spol, setSpol] = useState("");
    const [dob, setDob] = useState(0);
    const [krGrupa, setKrGrupa] = useState("");
    const [mjStan, setMjStan] = useState("");
    const [favkbc, setFavkbc] = useState("");

    useEffect(() => {
        setKorisnik(true);
        setIme(data ? data.ime : "")
        setPrezime(data ? data.prezime : "");
        setOib(data ? data.oib : "");
        setMbo(data ? data.mbo : "");
        setSpol(data ? data.spol : "");
        setDob(data ? data.dob : 0);
        setKrGrupa(data ? data.krgrupa : "");
        setMjStan(data ? data.mjstan : "");
        setFavkbc(data ? data.favkbc : "");
    }, []);

    const [isUrediPodatkeOpen, setUrediPodatkeOpen] = useState(false);
    function openUrediPodatke() {
        setUrediPodatkeOpen(true);
    }
    function closeUrediPodatkeModal() {
        setUrediPodatkeOpen(false);
    }





  return (
    <div>
        <div className="userContainer">
            <h1>Vaše informacije</h1>
            {korisnik && (
            <div className="userContainerData">
                <p>Ime: {ime}</p>
                <p>Prezime: {prezime}</p>
                <p>OIB: {oib}</p>
                <p>MBO: {mbo}</p>
                <p>Spol: {spol}</p>
                <p>Dob: {dob}</p>
                <p>Krvna grupa: {krGrupa}</p>
                <p>Mjesto stanovanja: {mjStan}</p>
                <p>Preferirani KBC: {favkbc}</p>
                <button onClick={openUrediPodatke}>Uredi podatke</button>
            </div>
            )}
            {isUrediPodatkeOpen && (
            <div className="modal">
              <div className="overlay">
                <div className="modal-content">
                  <h2>Uredi podatke</h2>
                  <form>
                    <input type="text" id="ime" defaultValue={ime}/>
                    <input type="text" id="prezime" defaultValue={prezime}/>
                    <input type="text" id="mjStan" defaultValue={mjStan}/>
                    <input type="text" id="favkbc" defaultValue={favkbc}/>
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
              <ul>
              {reservations.map((reservation) => (
                <li key={reservation.idRezervacija}>
                <p>
                  Lokacija: {reservation.imeLokacije}, Datum: {formatDate(reservation.vrijemePoc)}
                </p>
                </li>
              ))}
              </ul>
                
            </div>
        </div>

        <div className="userContainer">
            <h1>Vaša postignuća</h1>
            <div className="userContainerData">
              <p>Do sad ste dali krvi <span className="brojcek">10</span> puta!</p>
              <br></br>
              <br></br>


                
            </div>
        </div>

    </div>



  );
}
