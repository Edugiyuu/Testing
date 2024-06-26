import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Csvconverter from '../../imgs/CSVconverter1.png';
import MenuBar from '../../imgs/menu-aberto.png';
import { SaldosEtc } from "../ChatBot/CaixaDoChatBot";
import "../SideMenu/Menu.css";

const Menu = () => {
  const [blockVisible, setBlockVisible] = useState(false);

  const toggleBlockVisibility = () => {
    setBlockVisible(!blockVisible);
  };

  return (
    <div>
      <div className="Menu">

        <img src={Csvconverter} alt="Logo" className="logo" onClick={toggleBlockVisibility} />
        
        <NavLink className={'NavLink'} to={`/`}>Home</NavLink>
        <NavLink className={'NavLink'} to={`/Arquivos/`}>Arquivos</NavLink>
        <NavLink className={'NavLink'} to={`/grafico/`}>Gráficos</NavLink>
        <NavLink className={'NavLink'} to={`/calendario/`}>Calendario</NavLink>
        <NavLink className={'NavLink'} to={`/resumo/`}>Resumo</NavLink>
        <NavLink className={'NavLink'} to={`/editar/`}>Editar</NavLink>
        <img src={MenuBar} alt="Logo" className="MenuBar" onClick={toggleBlockVisibility} />
      </div>
      
      {blockVisible && (
        <div >
          <SaldosEtc/>
        </div>
        
      )}

    </div>
  );
};

export default Menu;
