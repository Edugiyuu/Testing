import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [nome, setNome] = useState('');
  const [totalPositivo, setTotalPositivo] = useState(0);
  const [totalNegativo, setTotalNegativo] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => {
        console.log("Todos os arquivos", data);
        console.log("primeiro arquivo", data[0]);
        console.log("primeiro valor do primeiro arquivo", data[0][0].Valor);

        
        var todosOsArquivosJuntos = [];
        for (let i = 0; i < data.length; i++) {
          todosOsArquivosJuntos = todosOsArquivosJuntos.concat(data[i]);
        }
     console.log(todosOsArquivosJuntos);
        setParsedData(todosOsArquivosJuntos);
        
        let totalPositivo = 0;
        let totalNegativo = 0;
        let totalFinal = 0;

        for (let i = 0; i < todosOsArquivosJuntos.length; i++) {
          //aqui ele vai pegar todos os valores que estão juntos
          const valor = Number(todosOsArquivosJuntos[i].Valor);
          /* console.log(valor); */
          if (valor > 0) {
            totalPositivo += valor
          } else {
            totalNegativo += valor
          }
          totalFinal += valor
        }

        setTotalPositivo(Math.floor(totalPositivo));
        setTotalNegativo(Math.floor(totalNegativo));
        setTotalFinal(Math.floor(totalFinal) );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ saldo, setSaldo, nome, setNome,parsedData, setParsedData, totalPositivo, setTotalPositivo, totalNegativo, setTotalNegativo,totalFinal, setTotalFinal}}>
      {children}
    </UserContext.Provider>
  );
};
