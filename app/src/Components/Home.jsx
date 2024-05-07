import React, { useState, useContext } from "react";
import { UserContext } from "../Hooks/UserContext";

import "../Home.css";
export const Home = () => {
  const {saldo, setSaldo, nome, setNome } = useContext(UserContext);
  return (
    <div className="TudoHome">
      <h1>Bem-vindo {nome}!</h1>
      <div className="InfoGeral">
      
        <div className="InfoTotal">
          <p>Total</p>
          <h2>R$ {0}</h2>
        </div>
        <div className="InfoGastos">
          <p>Gastos Totais</p>
          <h2>R$ {localStorage.getItem('totalGastos')}</h2>
        </div>
        <div className="InfoCreditos">
          <p>Creditos Totais</p>
          <h2>R$ {localStorage.getItem('totalLucros')}</h2>
        </div>
        
        <div className="Teste">
          <h3>Sua Conta</h3>
          <div className="InfoSaldo">
            <p>Saldo</p>
            <div>
              <h4>Transações: {localStorage.getItem('contador')}</h4>
              <h4>Saldo Inicial: R$ {saldo}</h4>
            </div>
            

          </div>
          
        </div>
        <div className="InfoGrafico">
          Grafico:
        </div>

      </div>
      
      
    </div>
  );
};


export default Home;