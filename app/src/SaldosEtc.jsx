
import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from "./UserContext";
import { Link } from 'react-router-dom';
import MyChatBot from './MyChatBot';
export const SaldosEtc = () => {
    const { valorDoSaldoReal,nomeReal} = useContext(UserContext);

  return (
    <div className="verSaldoEtc">
      <MyChatBot/>
       <div className='Nome'>
        <h2>Bem-vindo {nomeReal}!</h2>
      </div> 
      <div className='Saldo'>
        <h2>Seu Saldo: R${valorDoSaldoReal}</h2>
      </div>
      <br />
      <Link className={'NavLink'} to={`/`}>Editar..</Link>
    
    </div>
    
  )
}
