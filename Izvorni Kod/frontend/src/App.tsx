import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meni from "./komponente/Meni";
import Informacije from "./komponente/stranice/informacije/Informacije";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Meni />}>
          <Route
            path={"/info"}
            element={<Informacije />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
