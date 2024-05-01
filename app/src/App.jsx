import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../public/style.css';
import Grafico from './Components/grafico';
import Home from './Components/Home';
import Menu from "./Components/Menu";
import "./app.css";
import VerArquivo from "./Components/VerArquivo";
import Calendario from "./Components/Calendario";
import { UserStorage } from "./Hooks/UserContext";
import { SaldosEtc } from "./Components/SaldosEtc";
import Resumo from "./Components/Resumo";

const App = () => {

  return (
    
    <BrowserRouter >
    <UserStorage>
    <Menu/>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="verArquivo/" element={<VerArquivo />} />
      <Route path="grafico/" element={<Grafico />}/>
      <Route path="calendario/" element={<Calendario />}/>
      <Route path="resumo/" element={<Resumo />}/>
      
    
     {/*  <Route path="*" element={<Pagina404 />}/> */}
      
    </Routes>
    </UserStorage>
    </BrowserRouter>
      
    
  );
};

export default App;