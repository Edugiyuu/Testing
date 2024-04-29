import React, { useState, useContext } from "react";
import { UserContext } from "./Hooks/UserContext";
import handleFileChange from './HandleFile';
export const Home = () => {
  const [parsedData, setParsedData] = useState(
    JSON.parse(localStorage.getItem('parsedData')) || []
    // aqui ele está pegando a chave que está no HandleFile.jsx e
  );
  const { nomeReal, setNomeReal } = useContext(UserContext);
  const { valorDoSaldoReal, setValorDoSaldoReal } = useContext(UserContext); 
  const [valorDoSaldo, setValorDoSaldo] = useState(0); 
  const [nome, setNome] = useState('');

  const InputSaldo = (event) => {
    const valorDigitado = event.target.value;
    setValorDoSaldo(valorDigitado);
  };
  const InputNome = (event) => {
    const nomeDigitado = event.target.value;
    setNome(nomeDigitado);
  };

  const SalvarNomeESaldo = () => {
    setValorDoSaldoReal(valorDoSaldo);
    setNomeReal(nome)
  };
  const limparDadosLocalStorage = () => {
    localStorage.removeItem('parsedData');
    setParsedData([]);
    setValorDoSaldoReal(0);
    setNomeReal('')

  };
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setParsedData, parsedData)}
        accept=".csv"
      />
      
      <input
        type="text"
        required
       onChange={InputNome}
        placeholder="Seu Nome aqui.."
        
      />
      <input
        type="number"
        onChange={InputSaldo}
        required
        placeholder="Coloque seu saldo atual.."
      />
      {/* <h1>{usuario}</h1>  */}
      
      <button onClick={SalvarNomeESaldo}>
        Save
      </button>
      <button onClick={limparDadosLocalStorage}>Limpar Dados</button>
    </div>
  );
};


export default Home;