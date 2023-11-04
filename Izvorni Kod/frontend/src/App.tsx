import React from "react";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/Informacije";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Meni />}>
          <Route path="info" element={<Informacije />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
