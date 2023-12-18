import React from "react";
import { FlexBox, OverFlowDiv, TextBoxLokacije } from "../stilovi";
import { mockKBC, mockAkcija } from "./komunalije/mock_podatci";
import {
  faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMap from "../Karta";

export default function Lokacije() {
  const kbcs = 
    mockKBC.map((kbc, index) => {
      return <>
      <div style={{width: "90%" }}>
        <TextBoxLokacije style={{ fontWeight: "bold" }}>{kbc.ime}</TextBoxLokacije>
        <TextBoxLokacije>{kbc.adresa}</TextBoxLokacije>
      </div>
      {index !== mockKBC.length-1 && <hr style={{width: "100%"}}/>}
      </>
    } )
  
  const akcije = 
    mockAkcija.map((akcija, index) => {
      return <>
      <div style={{width: "90%" }}>
        <TextBoxLokacije>
          {akcija.adresa}
        </TextBoxLokacije>
        <TextBoxLokacije>
          {"Početak: "+akcija.vrijemePoc.toDateString()}
        </TextBoxLokacije>
        <TextBoxLokacije>
          {"Kraj: "+akcija.vrijemeKraj.toDateString()}
        </TextBoxLokacije>
        {akcija.hitna === true && <TextBoxLokacije style={{ fontWeight: "bold"}}><FontAwesomeIcon icon={faCircleExclamation} size="xl"/> {"HITNA AKCIJA! Krvna grupa: "+akcija.krGrupa}</TextBoxLokacije>}
      </div>
      {index !== mockAkcija.length-1 && <hr style={{width: "100%"}}/>}
      </>
    })
   
  return (
    <>
      <MyMap></MyMap>
      <FlexBox $justify="space-around" $height="100vh">
      
         <div>
        <p>Lokacije na kojima uvijek možete darivati krv:</p>
        <br></br>
        <OverFlowDiv $height="400px" $width="40%">
          <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem"}}>
            {kbcs}
          </FlexBox>
        </OverFlowDiv>
        </div>
        <div>
        <p>Trenutno aktivne akcije:</p>
        <br></br>
        <OverFlowDiv $height="400px" $width="40%">
          <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem"}}>
            {akcije}
          </FlexBox>
        </OverFlowDiv>
        </div>
      </FlexBox>
        
    </>
  );
}
