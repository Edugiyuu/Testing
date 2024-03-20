import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link,NavLink } from 'react-router-dom';


const Menu = () => {


  return (
    <div>
        <NavLink className={'NavLink'} to={`/`}>Home</NavLink>
        <NavLink className={'NavLink'} to={`/input/`}>Ver Arquivo</NavLink>
        <NavLink className={'NavLink'} to={`/grafico/`}>Gráficos</NavLink>
    </div>
  );
};

export default Menu;