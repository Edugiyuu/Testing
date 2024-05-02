import React, { useState, useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import handleFileChange from '../HandleFile';
/* import "../GiveInfos.css"; */
export const GiveInfos = () => {
  const [parsedData, setParsedData] = useState(
    JSON.parse(localStorage.getItem('parsedData')) || []
    // aqui ele está pegando a chave que está no HandleFile.jsx e
  );
  const { valorDoSaldoReal, setValorDoSaldoReal, nomeReal, setNomeReal } = useContext(UserContext);
  const [valorDoSaldo, setValorDoSaldo] = useState(0); 
  const [nome, setNome] = useState('');
  const [contadorDeTransacao, setContadorDeTransacao] = useState(0);
  const [totalDeGastos, setTotalDeGastos] = useState(0);
  const [totalDeLucros, setTotalDeLucros] = useState(0);

  const InputSaldo = (event) => {
    const valorDigitado = event.target.value;
    setValorDoSaldo(valorDigitado);
    localStorage.setItem('Saldo', valorDigitado)
  };
  const InputNome = (event) => {
    const nomeDigitado = event.target.value;
    setNome(nomeDigitado);
    localStorage.setItem('Nome', nomeDigitado)
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
    localStorage.setItem('Nome', nomeReal)
    localStorage.setItem('Saldo', valorDoSaldoReal)
    localStorage.setItem('contador', 0)
    localStorage.setItem('SaldoDepois',0)
    localStorage.setItem('totalGastos',0)
    localStorage.setItem('totalLucros',0)

  };
  
  
  return (
    <div className="TudoHome">
      
      <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setParsedData, parsedData,setContadorDeTransacao,setTotalDeGastos,setTotalDeLucros)}
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
      
      <button onClick={SalvarNomeESaldo}>
        Save
      </button>
      <button onClick={limparDadosLocalStorage}>Limpar Dados</button>
    </div>
  );
};


export default GiveInfos;