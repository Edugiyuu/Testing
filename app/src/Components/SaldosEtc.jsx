
import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from "../Hooks/UserContext";
import { Link } from 'react-router-dom';
import MyChatBot from '../MyChatBot';
import "../SaldosEtc.css";
export const SaldosEtc = () => {
    const { valorDoSaldoReal,nomeReal,saveFile} = useContext(UserContext);

  return (
    <div className="verSaldoEtc">
      <MyChatBot/>
       <div className='Nome'>
        <h2>Bem-vindo {localStorage.getItem('Nome', nomeReal)}!</h2>
      </div> 
      <div className='Saldo'>
        <h2>Seu Saldo: R${localStorage.getItem('Saldo', valorDoSaldoReal)}</h2>
      </div>
      <br />
      <Link className={'NavLink'} to={`/`}>Editar..</Link>
    
    </div>
    
  )
}
