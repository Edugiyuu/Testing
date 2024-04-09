import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link,NavLink } from 'react-router-dom';
import Csvconverter from './imgs/CSVconverter1.png'


const Menu = () => {


  return (
    <div className="Menu">
      
      <img src={Csvconverter} alt="Logo" className="logo" /* onClick={} *//>
      
      <NavLink className={'NavLink'} to={`/`}>Home</NavLink>
      <NavLink className={'NavLink'} to={`/verArquivo/`}>Ver Arquivo</NavLink>
      <NavLink className={'NavLink'} to={`/grafico/`}>Gráficos</NavLink>
      <NavLink className={'NavLink'} to={`/calendario/`}>Calendario</NavLink>
      
        
        
    </div>
  );
};

export default Menu;