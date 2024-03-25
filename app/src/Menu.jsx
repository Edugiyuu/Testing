import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link,NavLink } from 'react-router-dom';


const Menu = () => {


  return (
    <div className="Menu">
        <NavLink className={'NavLink'} to={`/`}>Home</NavLink>
        <NavLink className={'NavLink'} to={`/verArquivo/`}>Ver Arquivo</NavLink>
        <NavLink className={'NavLink'} to={`/grafico/`}>Gráficos</NavLink>
    </div>
  );
};

export default Menu;