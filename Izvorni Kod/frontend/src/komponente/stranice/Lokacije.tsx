import React from "react";
import { LokacijeDiv, FlexBox, OverFlowDiv } from "../stilovi";
import { mockKBC, mockAkcija } from "./komunalije/mock_podatci";
import {
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMap from "../Karta";

const brojHitnihAkcija = mockAkcija.filter((akcija) => akcija.hitna).length;

export default function Lokacije() {
  const kbcs = 
    mockKBC.map((kbc, index) => {
      return <>
      <div style={{width: "100%" }}>
        <p style={{ fontWeight: "bold" }}>{kbc.ime}</p>
        <p>{kbc.adresa}</p>
      </div>
      {index !== mockKBC.length-1 && <hr style={{width: "100%"}}/>}
      </>
    } )
  
    const akcije = mockAkcija
    .filter((akcija) => !akcija.hitna)
    .map((akcija, index) => (
      <div style={{ width: "100%" }} key={index}>
        <p>{akcija.adresa}</p>
        <p>{"Početak: " + akcija.vrijemePoc.toDateString()}</p>
        <p style={{padding: "0 0 1rem 0"}}>{"Kraj: " + akcija.vrijemeKraj.toDateString()}</p>
        {akcija.hitna && (
          <p className="hitna">
            <FontAwesomeIcon icon={faCircleExclamation} size="xl" color="red"/> {"HITNA AKCIJA! Krvna grupa: " + akcija.krGrupa}
          </p>
        )}
        {index !== mockAkcija.length - brojHitnihAkcija - 1 && <hr style={{ width: "100%" }} />}
      </div>
    ));
  

    const hitneAkcije = mockAkcija.map((akcija, index) => (
      akcija.hitna && (
        <div style={{ width: "100%" }} key={index}>
        {akcija.hitna && (
            <p style={{ fontWeight: "bold", color: "#a82d2d" }}>
              <FontAwesomeIcon icon={faCircleExclamation} size="xl" /> {"HITNA AKCIJA! Krvna grupa: " + akcija.krGrupa}
            </p>
          )}
          <p>
            {akcija.adresa}
          </p>
          <p>
            {"Početak: " + akcija.vrijemePoc.toDateString()}
          </p>
          <p style={{padding: "0 0 1rem 0"}}>
            {"Kraj: " + akcija.vrijemeKraj.toDateString()}
          </p>
          {index !== mockAkcija.length - 1 && <hr style={{ width: "100%" }} />}
        </div>
      )
    ));
    
   
  return (
    <LokacijeDiv>
      <MyMap></MyMap>
      <FlexBox $justify="start" $height="fit-content" $align="flex-start" $width="100%">
        <div>
          <h2>Lokacije na kojima uvijek možete donirati krv:</h2>
          <OverFlowDiv $height="fit-content" $width="100%">
            <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem"}}>
              {kbcs}
            </FlexBox>
          </OverFlowDiv>
        </div>
        <div>
          <h2>Trenutno aktivne akcije:</h2>
          <OverFlowDiv $height="fit-content" $width="100%">
            <FlexBox $direction="column" style={{padding: "1rem 0rem 0rem 0rem"}}>
              {hitneAkcije}
              {akcije}
            </FlexBox>
          </OverFlowDiv>
        </div>
      </FlexBox>
    </LokacijeDiv>
  );
}
