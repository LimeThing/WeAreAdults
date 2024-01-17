import React, { useEffect, useState } from "react";
import useCookies from "./stranice/udice/useCookies";
import { api } from "../api";
import { useGetKorisnikInfo } from "./stranice/udice/useGetKorisnikInfo";
import { useGetKorisnikRezervacija } from "./stranice/udice/useGetKorisnikRezervacija";
import  formatDate  from "./stranice/udice/useFormatDate";






export default function StranicaKorisnika() {

    const { token, setToken } = useCookies();
    const { data: korisnikInfos } = useGetKorisnikInfo(token || "");
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

    const[numberOfDonations, setNumberOfDonations] = useState(0);
    const[moreToDo, setMoreToDo] = useState(0);

    const futureReservations = reservations.filter(
      (reservation) => new Date(reservation.vrijemePoc) >= new Date()
    );
    
    const isEligibleForFreeHealthcare =
      (spol === "MUŠKO" && numberOfDonations >= 35) ||
      (spol === "ŽENSKO" && numberOfDonations >= 50); 

      

      

    useEffect(() => {
        setKorisnik(true);
        setIme(korisnikInfos ? korisnikInfos.ime : "")
        setPrezime(korisnikInfos ? korisnikInfos.prezime : "");
        setOib(korisnikInfos ? korisnikInfos.oib : "");
        setMbo(korisnikInfos ? korisnikInfos.mbo : "");
        setSpol(korisnikInfos ? korisnikInfos.spol : "");
        setDob(korisnikInfos ? korisnikInfos.dob : 0);
        setKrGrupa(korisnikInfos ? korisnikInfos.krgrupa : "");
        setMjStan(korisnikInfos ? korisnikInfos.mjstan : "");
        setFavkbc(korisnikInfos ? korisnikInfos.favkbc : "");

        setNumberOfDonations(reservations.length - futureReservations.length);

        console.log(spol);

        if(spol === "Muško") {
          setMoreToDo(50 - numberOfDonations);
        }
        console.log(moreToDo);

        if(spol === "Žensko") {
          setMoreToDo(35 - numberOfDonations);
        }

    }, []);

    



    

    const [isUrediPodatkeOpen, setUrediPodatkeOpen] = useState(false);
    function openUrediPodatke() {
        setUrediPodatkeOpen(true);
    }
    function closeUrediPodatkeModal() {
        setUrediPodatkeOpen(false);
    }

    const handleDataChange = () => {
      /* napisati funkciju koja salje izmjenjene podatke na back*/
    }

    const [isOtkažiTerminOpen, setOtkažiTerminOpen] = useState(false);
    function openOtkažiTermin() {
        setOtkažiTerminOpen(true);
    }
    function closeOtkažiTerminModal() {
        setOtkažiTerminOpen(false);
    }







  return (
    <div>
        <div className="userContainer">
            <h1>Vaše informacije</h1>
            {korisnik && (
            <div className="userContainerData">
                <p>Ime: <span className="podatci">{ime}</span></p>
                <p>Prezime: <span className="podatci">{prezime}</span></p>
                <p>OIB: <span className="podatci">{oib}</span></p>
                <p>MBO: <span className="podatci">{mbo}</span></p>
                <p>Spol: <span className="podatci">{spol}</span></p>
                <p>Dob: <span className="podatci">{dob}</span></p>
                <p>Krvna grupa: <span className="podatci">{krGrupa}</span></p>
                <p>Mjesto stanovanja: <span className="podatci">{mjStan}</span></p>
                <p>Preferirani KBC: <span className="podatci">{favkbc}</span></p>
                <button onClick={openUrediPodatke}>Uredi podatke</button>
            </div>
            )}
            {isUrediPodatkeOpen && (
            <div className="modal">
              <div className="overlay">
                <div className="modal-content">
                  <h2>Uredi podatke</h2>
                  <form onSubmit={handleDataChange}> 
                    <label>Ime:</label>
                    <input type="text" id="ime" defaultValue={ime}/>
                    <label>Prezime:</label>
                    <input type="text" id="prezime" defaultValue={prezime}/>
                    <label>Mjesto stanovanja:</label>
                    <input type="text" id="mjStan" defaultValue={mjStan}/>
                    <label>Preferirani KBC:</label>
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
              {futureReservations.length === 0 &&
                <h4>Trenutno nemate rezerviranih termina!</h4>
              }
              {futureReservations.length > 0 && 
              <div>
              <ul>
                {futureReservations.map((reservation) => (
                  <li key={reservation.idRezervacija}>
                    <p> Lokacija: {reservation.imeLokacije}, Datum:{" "}{formatDate(reservation.vrijemePoc)}</p>
                  </li>
                ))}
              </ul> 
              <button onClick={openOtkažiTermin}>Otkaži termin</button>
              </div>
            }
            </div>
        </div>

        <div className="userContainer">
            <h1>Vaša postignuća</h1>
            <div className="userContainerData">
              <p>Do sad ste dali krvi <span className="brojcek">{numberOfDonations}</span> puta!</p>
              {isEligibleForFreeHealthcare && (
                <div>
                  <p>Čestitke!</p>
                  <p>Ostvarili ste pravo na besplatno dopunsko zdravstveno osiguranje HZZO-a!</p>
                </div>
              )}
              {!isEligibleForFreeHealthcare && (
                <div>
                 <p>Još Vas samo <span className="brojcek">{moreToDo}</span>davanja krvi dijeli od besplatnog dopunskog zdravstvenog osiguranja HZZO-a!</p>
                </div>
              )}
              

              <br></br>
              <br></br>


                
            </div>
        </div>

    </div>



  );
}
