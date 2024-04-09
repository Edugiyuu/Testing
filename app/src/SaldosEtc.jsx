
import React, { useState, useEffect,useContext } from 'react';
import { UserContext } from "./UserContext";
export const SaldosEtc = () => {
    const { usuario } = useContext(UserContext);

  return (
    <div className='Saldo'>
        <h1 >Seu Saldo: R${usuario}</h1>
    </div>
  )
}
