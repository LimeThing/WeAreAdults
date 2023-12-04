import React from "react";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/Informacije";
import Registracija from "./komponente/stranice/Registracija";
import Login from "./komponente/stranice/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StvaranjeAkcija from "./komponente/stranice/StvaranjeAkcija";

import Lokacije from "./komponente/stranice/Lokacije";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Meni />}>
          <Route path="info" element={<Informacije />} />
          <Route path="stvaranje-akcija" element={<StvaranjeAkcija />} />
          <Route path="lokacije" element={<Lokacije />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
