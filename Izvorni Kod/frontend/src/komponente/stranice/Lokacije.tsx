import React from "react";
import { CustomTextBox, FlexBox, OverFlowDiv, TextBoxLokacije } from "../stilovi";
import { mockKBC, mockAkcija } from "./komunalije/mock_podatci";



export default function Lokacije() {
  const kbcs = 
    mockKBC.map((kbc, index) => {
      return <>
      <div style={{width: "90%" }}>
        <TextBoxLokacije>{kbc.ime}</TextBoxLokacije>
        <TextBoxLokacije>{kbc.adresa}</TextBoxLokacije>
      </div>
      {index !== mockKBC.length-1 && <hr style={{border: "solid black", width: "100%"}}/>}
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
        {akcija.hitna === true && <TextBoxLokacije>{"HITNA AKCIJA! Tip krvi: "+akcija.krGrupa}</TextBoxLokacije>}
      </div>
      {index !== mockAkcija.length-1 && <hr style={{border: "solid black", width: "100%"}}/>}
      </>
    })
   
  return (
    <>
      <FlexBox $justify="space-around" $height="100vh">

        <OverFlowDiv $height="400px" $width="40%" style={{border: "solid black 4px"}}>
          <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem", background: "red"}}>
            {kbcs}
          </FlexBox>
        </OverFlowDiv>

        <OverFlowDiv $height="400px" $width="40%" style={{border: "solid black 4px"}}>
          <FlexBox $direction="column"  style={{padding: "1rem 0rem 1rem 0rem", background: "red"}}>
            {akcije}
          </FlexBox>
        </OverFlowDiv>

      </FlexBox>
        
    </>
  );
}
