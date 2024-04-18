import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../public/style.css';
import Grafico from './grafico';
import Home from './Home';
import Menu from "./Menu";
import "./app.css";
import VerArquivo from "./VerArquivo";
import Calendario from "./Calendario";
import { UserStorage } from "./UserContext";
import { SaldosEtc } from "./SaldosEtc";
import Resumo from "./Resumo";

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