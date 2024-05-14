
import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from "../../Hooks/UserContext";
import { Link } from 'react-router-dom';
import MyChatBot from './MyChatBot';
import "../ChatBot/CaixaDoChatBot.css";
export const SaldosEtc = () => {
  const {saldo, setSaldo, nome, setNome,parsedData, setParsedData} = useContext(UserContext);

  return (
    <div className="verSaldoEtc">
      <MyChatBot/>
       <div className='Nome'>
        <h2>Bem-vindo {nome}!</h2>
      </div> 
      <div className='Saldo'>
        <h2>Seu Saldo: R${saldo}</h2>
      </div>
      <br />
      <Link className={'NavLink'} to={`/`}>Editar..</Link>
    
    </div>
    
  )
}
