import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [nome, setNome] = useState('');
  const [totalPositivo, setTotalPositivo] = useState(0);
  const [parsedData, setParsedData] = useState(
    JSON.parse(localStorage.getItem('parsedData')) || []
  );
  
  useEffect(() => {
    const saldoDoLocalStorage = localStorage.getItem('saldo');
    const nomeDoLocalStorage = localStorage.getItem('nome');

    let totalPositivo = 0;

    for (let i = 0; i < parsedData.length; i++) {
      if (parsedData[i].Valor > 0) {
        totalPositivo += Number(parsedData[i].Valor);
      }
    }

    if (saldoDoLocalStorage) {
      setSaldo(Number(saldoDoLocalStorage));
    }
    
    if (nomeDoLocalStorage) {
      setNome(nomeDoLocalStorage);
    }

    setTotalPositivo(totalPositivo);
    localStorage.setItem('totalPositivo', totalPositivo);
    

  }, [parsedData]);

  useEffect(() => {
    localStorage.setItem('saldo', saldo.toString());
  }, [saldo]);

  useEffect(() => {
    localStorage.setItem('nome', nome);
  }, [nome]);

  return (
    <UserContext.Provider value={{ saldo, setSaldo, nome, setNome,parsedData, setParsedData, totalPositivo, setTotalPositivo }}>
      {children}
    </UserContext.Provider>
  );
};
