import React, { useState, useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import handleFileChange from '../HandleFile';
import "../Home.css";
export const Home = () => {
  const [parsedData, setParsedData] = useState(
    JSON.parse(localStorage.getItem('parsedData')) || []
    // aqui ele está pegando a chave que está no HandleFile.jsx e
  );
  const { valorDoSaldoReal, setValorDoSaldoReal, nomeReal, setNomeReal } = useContext(UserContext);
  const [valorDoSaldo, setValorDoSaldo] = useState(0); 
  const [nome, setNome] = useState('');

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

  };
  return (
    <div className="TudoHome">
      <h1>Bem-vindo {localStorage.getItem('Nome', nomeReal)}!</h1>
      <div className="InfoGeral">
      
        <div className="InfoTotal">
          <p>Total</p>
          <h2>R$ {localStorage.getItem('Saldo', valorDoSaldoReal)}</h2>
        </div>
        <div className="InfoGastos">
          <p>Gastos Totais</p>
          <h2>R$ 0</h2>
        </div>
        <div className="InfoCreditos">
          <p>Creditos Totais</p>
          <h2>R$ 0</h2>
        </div>
        
        <div className="Teste">
          <h3>Sua Conta</h3>
          <div className="InfoSaldo">
            <p>Saldo</p>
            <div>
              <h4>Transações: {0}</h4>
              <h4>R$ 0</h4>
            </div>
            

          </div>
          
        </div>
      </div>
      
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
      
      <button onClick={SalvarNomeESaldo}>
        Save
      </button>
      <button onClick={limparDadosLocalStorage}>Limpar Dados</button>
    </div>
  );
};


export default Home;