import React, { useState, useEffect } from "react";
import { LokacijeDiv, FlexBox, OverFlowDiv } from "../stilovi";
import {
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMap from "../Karta";
import { AkcijaModel, KBCModel, KorisnikModel } from "../modeli";
import { api } from "../../api";
import { useQuery } from "@tanstack/react-query";

export default function Lokacije() {

  const [aktivneAkcije, setAktivneAkcije] = useState<AkcijaModel[]>([])
  const [KBC, setKBC] = useState<KBCModel[]>([])
  const [korisnik, setKorisnik] = useState<KorisnikModel>()
  const [mbo, setMbo] = useState(sessionStorage.getItem('mbo'));
  console.log(mbo);

  const fetchAkcije = (): Promise<AkcijaModel[]> =>
    api
      .get("/akcija/get_aktivne")
      .then((response: any) => response.data);

  const fetchKbc = (): Promise<KBCModel[]> =>
    api
    .get("/kbc/get_all")
    .then((response: any) => response.data);

  const fetchKorisnik = ():Promise<KorisnikModel> =>
    api.get(`/korisnik/get_one/${mbo}`)
    .then((Response: any) => Response.data);

  const { isLoading: isLoadingAktivne, data: dataAktivne } = useQuery<AkcijaModel[]>({
    queryKey: ["getAkcija", mbo],
    queryFn: fetchAkcije,
  });

  const { isLoading: isLoadingKbc, data: dataKbc } = useQuery<KBCModel[]>({
    queryKey: ["getKbc"],
    queryFn: fetchKbc,
  });

  const { isLoading: isLoadingKorisnik, data: dataKorisnik } = useQuery<KorisnikModel>({
    queryKey: ["getKorisnik"],
    queryFn: fetchKorisnik,
  })

  useEffect(() => {
    setAktivneAkcije(dataAktivne ? dataAktivne : []);
    setKBC(dataKbc ? dataKbc : []);
    setKorisnik(dataKorisnik);
  }, [dataAktivne, dataKbc, dataKorisnik]);

  const kbcs = 
    KBC.map((kbc, index) => {
      return <>
      <div style={{width: "100%" }}>
        <p style={{ fontWeight: "bold" }}>{kbc.ime}</p>
        <p>{kbc.adresa}</p>
      </div>
      {index !== KBC.length-1 && <hr style={{width: "100%"}}/>}
      </>
    });
  
    const hitneAkcije = aktivneAkcije.filter((akcija) => akcija.hitna).map((akcija, index) => (
        <div style={{ 
          width: "100%", 
          background: akcija.krgrupa === korisnik?.krgrupa && akcija.imeLokacije === korisnik?.favkbc ? "#a82d2d" : "white", 
          border: akcija.krgrupa === korisnik?.krgrupa ? "#a82d2d solid 10px" : "none",
          color: akcija.krgrupa === korisnik?.krgrupa && akcija.imeLokacije === korisnik?.favkbc ? "white" : "black",
          borderRadius: index === 0 ? "30px 30px 0 0" : "0"
          }} 
          key={index}>
          <p style={{ fontWeight: "bold", color: akcija.krgrupa === korisnik?.krgrupa && akcija.imeLokacije === korisnik?.favkbc ? "white" : "#a82d2d", padding: "1rem 0 0 0" }}>
            <FontAwesomeIcon icon={faCircleExclamation} size="xl" /> {"HITNA AKCIJA! Krvna grupa: " + akcija.krgrupa}
          </p>
          <p style={{ fontWeight: "bold"}}>
            {akcija.imeLokacije}
          </p>
          <p>
            {akcija.adresa}
          </p>
          <p>
            {"Početak: " + akcija.datumPoc}
          </p>
          <p style={{padding: "0 0 1rem 0"}}>
            {"Kraj: " + akcija.datumKraj}
          </p>
          {index !== aktivneAkcije.length - 1 && <hr style={{ width: "100%" }} />}
        </div>
      )
    );

    const akcije = aktivneAkcije
    .filter((actions) => !actions.hitna)
    .map((actions, index) => (
      <div style={{ width: "100%", padding:"1rem 0 0rem 0",
      borderRadius: index === 0 ? "30px 30px 0 0" : "0"}} key={index}>
        <p style={{ fontWeight: "bold" }}>{actions.imeLokacije}</p>
        <p>{actions.adresa}</p>
        <p>{"Početak: " + actions.datumPoc}</p>
        <p style={{padding: "0 0 1rem 0"}}>{"Kraj: " + actions.datumKraj}</p>
        {index !== aktivneAkcije.length - hitneAkcije.length - 1 && <hr style={{ width: "100%" }} />}
      </div>
    ));
          
    if (isLoadingAktivne || isLoadingKbc) return <></>;
    else
  return (
    <LokacijeDiv>
      <MyMap aktivneAkcije={aktivneAkcije} KBC={KBC}></MyMap>
      <FlexBox $justify="space-around" $height="fit-content" $alignItems="flex-start" $width="fit-content">
        <div>
          <h2>Lokacije na kojima uvijek možete donirati krv:</h2>
          <OverFlowDiv $height="fit-content" $width="fit-content">
            <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem"}}>
              {kbcs}
            </FlexBox>
          </OverFlowDiv>
        </div>
        { aktivneAkcije.length > 0 && ( 
        <div>
          <h2>Trenutno aktivne akcije:</h2>
          <OverFlowDiv $height="fit-content" $width="fit-content">
            <FlexBox $direction="column" style={{gap: "0", borderRadius: "30px"}}>
              {hitneAkcije}
              {akcije}
            </FlexBox>
          </OverFlowDiv>
        </div>
          )}
        { aktivneAkcije.length === 0 && (
          <div>
            <h2>Nema trenutno aktivnih akcija!</h2>
          </div>
        )}
      </FlexBox>
    </LokacijeDiv>
  );
}