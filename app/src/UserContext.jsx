import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [usuario, setUsuario] = useState(0); // Inicializamos o estado do usuário com 0

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
