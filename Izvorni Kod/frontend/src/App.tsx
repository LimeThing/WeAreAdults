import React from "react";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/Informacije";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StvaranjeAkcija from "./komponente/stranice/StvaranjeAkcija";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Meni />}>
          <Route path="info" element={<Informacije />} />
          <Route path="stvaranje-akcija" element={<StvaranjeAkcija />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
