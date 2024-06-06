import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../public/style.css';
import Grafico from './Components/Grafico/grafico';
import Home from './Components/Home/Home';
import Menu from "./Components/SideMenu/Menu";
import "./app.css";
import Arquivos from "./Components/VerArquivo/Arquivos";
import Test from "../src/Test";
import VerArquivo from "./Components/VerArquivo/VerArquivo";
import Calendario from "./Components/Calendario/Calendario";
import { UserStorage } from "./Hooks/UserContext";
import { SaldosEtc } from "./Components/ChatBot/CaixaDoChatBot";
import Resumo from "./Components/Resumo/Resumo";
import GiveInfos from "./Components/GiveInfos";

const App = () => {
  const [data, setData] = useState(null);

  return (
    <BrowserRouter>
      <UserStorage>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="verArquivo/:id" element={<VerArquivo />} />
          <Route path="Arquivos" element={<Arquivos />} />
          <Route path="grafico" element={<Grafico />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="resumo" element={<Resumo />} />
          <Route path="editar" element={<GiveInfos />} />
          <Route path="test" element={<Test />} />
          {/* <Route path="*" element={<Pagina404 />}/> */}
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;