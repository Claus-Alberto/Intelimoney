import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./pages/main/Main";
import Retirement from "./pages/retirement/Retirement";
import Conversion from "./pages/conversion/Conversion";
import Investments from "./pages/investiments/Investments";
import Simulation from "./pages/simulation/Simulation";


const  App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/retirement" element={<Retirement />} />
        <Route path="/conversion" element={<Conversion />} />
        <Route path="/investment" element={<Investments />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
