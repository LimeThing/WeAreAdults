import React from "react";
import { FlexBox } from "../stilovi";

export default function Pocetna() {
  return (
    <FlexBox $direction="column">
      <h1 style={{paddingTop: "4rem", color: "#a82f2d"}}>Dobrodošli!</h1>
      <img src="drakula.jpg" alt="drakula" style={{ width: "30rem" }} />
    </FlexBox>
  );
}
