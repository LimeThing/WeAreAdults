import React from "react";
import { CustomTextBox, FlexBox, OverFlowDiv, TextBox } from "../stilovi";
import { mockKBC, mockAkcija } from "./komunalije/mock_podatci";



export default function Lokacije() {
  const kbcs = 
    mockKBC.map((kbc, index) => {
      return <>
      <div style={{width: "90%" }}>
        <TextBox style={{ width: "100%" , padding: "0 0 0.5rem 0"}}>{kbc.ime}</TextBox>
        <TextBox style={{padding: "0.5rem 0 0 0"}}>{kbc.adresa}</TextBox>
      </div>
      {index !== mockKBC.length-1 && <hr style={{border: "solid black", width: "100%"}}/>}
      </>
    } )
  
  const akcije = 
    mockAkcija.map((akcija, index) => {
      return <>
      <div style={{width: "90%" }}>
        <TextBox style={{ width: "100%" , padding: "0 0 0.5rem 0"}}>
          {akcija.adresa}
        </TextBox>
        <TextBox style={{ width: "100%" , padding: "0 0 0.5rem 0"}}>
          {"Početak: "+akcija.vrijemePoc.toDateString()}
        </TextBox>
        <TextBox style={{ width: "100%" , padding: "0 0 0.5rem 0"}}>
          {"Kraj: "+akcija.vrijemeKraj.toDateString()}
        </TextBox>
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
        
      <div>Lokacije</div>
      <button>{mockKBC[0].adresa}</button>
      <CustomTextBox>Text</CustomTextBox>
    </>
  );
}
