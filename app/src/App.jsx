import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Input from './Input';
import '../public/style.css';
import Grafico from './grafico';
import Home from './Home';
import Menu from "./Menu";
import "./app.css";


const App = () => {

  return (
    
    <BrowserRouter >
    <Menu/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="input/" element={<Input />} />
      <Route path="grafico/" element={<Grafico />}/>
      
    
     {/*  <Route path="*" element={<Pagina404 />}/> */}
      
    </Routes>
      
    </BrowserRouter>
      
    
  );
};

export default App;