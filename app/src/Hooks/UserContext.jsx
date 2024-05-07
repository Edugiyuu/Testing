import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [nome, setNome] = useState('');
  
  useEffect(() => {
    const saldoDoLocalStorage = localStorage.getItem('saldo');
    const nomeDoLocalStorage = localStorage.getItem('nome');

    if (saldoDoLocalStorage) {
      setSaldo(Number(saldoDoLocalStorage));
    }
    
    if (nomeDoLocalStorage) {
      setNome(nomeDoLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('saldo', saldo.toString());
  }, [saldo]);

  useEffect(() => {
    localStorage.setItem('nome', nome);
  }, [nome]);

  return (
    <UserContext.Provider value={{ saldo, setSaldo, nome, setNome }}>
      {children}
    </UserContext.Provider>
  );
};
