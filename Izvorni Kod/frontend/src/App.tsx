import React from "react";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/Informacije";
import Registracija from "./komponente/stranice/Registracija";
import Login from "./komponente/stranice/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StvaranjeAkcija from "./komponente/stranice/StvaranjeAkcija";
import Verifikacija from "./komponente/stranice/Verifikacija";
import StranicaKorisnika from "./komponente/stranice/StranicaKorisnika";

import Lokacije from "./komponente/stranice/Lokacije";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Pocetna from "./komponente/stranice/Pocetna";
import PromijenaAkcija from "./komponente/stranice/PromijenaAkcija";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Meni />}>
              <Route path="/" element={<Pocetna />} />
              <Route path="verifikacija" element={<Verifikacija />} />
              <Route path="info" element={<Informacije />} />
              <Route path="stvaranje-akcija" element={<StvaranjeAkcija />} />
              <Route path="lokacije" element={<Lokacije />} />
              <Route path="registracija" element={<Registracija />} />
              <Route path="login" element={<Login />} />
              <Route path="promijena-akcija" element={<PromijenaAkcija />} />
              <Route path="stranica-korisnika" element={<StranicaKorisnika />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
