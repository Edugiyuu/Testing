import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
export const Home = () => {
  
  const { nomeReal, setNomeReal } = useContext(UserContext);
  const { valorDoSaldoReal, setValorDoSaldoReal } = useContext(UserContext); // Aqui acessamos o contexto
  const [valorDoSaldo, setValorDoSaldo] = useState(0); // Inicializamos o estado do saldo com 0
  const [nome, setNome] = useState('');

  const InputSaldo = (event) => {
    const valorDigitado = event.target.value;
    setValorDoSaldo(valorDigitado);
  };
  const InputNome = (event) => {
    const nomeDigitado = event.target.value;
    setNome(nomeDigitado);
  };

  const SalvarSaldo = () => {
    setValorDoSaldoReal(valorDoSaldo);
    setNomeReal(nome)
  };

  return (
    <div>
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
      
      <button onClick={SalvarSaldo}>
        Save
      </button>
    </div>
  );
};


export default Home;