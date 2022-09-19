import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./pages/main/Main";
import Retirement from "./pages/retirement/Retirement";
import Conversion from "./pages/conversion/Conversion"


const  App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="retirement" element={<Retirement />} />
        <Route path="conversion" element={<Conversion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
