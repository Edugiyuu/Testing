import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [valorDoSaldoReal, setValorDoSaldoReal] = useState(0); 
  const [nomeReal, setNomeReal] = useState('');
  const [saveFile, setSaveFile] = useState([]);
  return (
    <div>
    <UserContext.Provider value={{ valorDoSaldoReal, setValorDoSaldoReal, nomeReal, setNomeReal,saveFile,setSaveFile}}>
      {children}
    </UserContext.Provider>
    
    </div>
  );
};
