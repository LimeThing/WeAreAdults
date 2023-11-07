import React from "react";
import { CustomTextBox } from "../stilovi";

type MockType = {
    adresa: string
}

const mock : MockType[] = [{
    adresa: "Stjepana radiva 4"
},
{
    adresa: "Hrvatskih radova 34"
}]

export default function Lokacije() {
  return (
    <>
      <div>Lokacije</div>
      <button>{mock[0].adresa}</button>
      <CustomTextBox>Text</CustomTextBox>
    </>
  );
}
