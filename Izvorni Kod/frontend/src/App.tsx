import React from "react";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/Informacije";
import Registracija from "./komponente/stranice/Registracija";
import Login from "./komponente/stranice/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StvaranjeAkcija from "./komponente/stranice/StvaranjeAkcija";
import Verifikacija from "./komponente/stranice/Verifikacija";

import Lokacije from "./komponente/stranice/Lokacije";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Meni />}>
            <Route path="verifikacija" element={<Verifikacija />} />
            <Route path="info" element={<Informacije />} />
            <Route path="stvaranje-akcija" element={<StvaranjeAkcija />} />
            <Route path="lokacije" element={<Lokacije />} />
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
