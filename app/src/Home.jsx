import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const Home = () => {
  const { usuario, setUsuario } = useContext(UserContext); // Aqui acessamos o contexto
  const [valorDoSaldo, setValorDoSaldo] = useState(0); // Inicializamos o estado do saldo com 0

  const valorEstimado = (event) => {
    const valorDigitado = event.target.value;
    setValorDoSaldo(valorDigitado);
  };

  const SalvarSaldo = () => {
    setUsuario(valorDoSaldo); 
  };

  return (
    <div>
      <input
        type="text"
        /* onChange={valorEstimado} */
        placeholder="Seu Nome aqui.."
      />
      <input
        type="number"
        onChange={valorEstimado}
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