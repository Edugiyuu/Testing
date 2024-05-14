import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../public/style.css';
import Grafico from './Components/Grafico/grafico';
import Home from './Components/Home/Home';
import Menu from "./Components/SideMenu/Menu";
import "./app.css";
import VerArquivo from "./Components/VerArquivo/VerArquivo";
import Calendario from "./Components/Calendario/Calendario";
import { UserStorage } from "./Hooks/UserContext";
import { SaldosEtc } from "./Components/ChatBot/CaixaDoChatBot";
import Resumo from "./Components/Resumo/Resumo";
import GiveInfos from "./Components/GiveInfos";

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
      <Route path="editar/" element={<GiveInfos />}/>
      
    
     {/*  <Route path="*" element={<Pagina404 />}/> */}
      
    </Routes>
    </UserStorage>
    </BrowserRouter>
      
    
  );
};

export default App;