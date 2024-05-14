import React, { useState, useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import handleFileChange from '../HandleFile';
/* import "../GiveInfos.css"; */
export const GiveInfos = () => {
  const {saldo, setSaldo, nome, setNome,parsedData, setParsedData} = useContext(UserContext);
  const [novoSaldo, setNovoSaldo] = useState(saldo); 
  const [novoNome, setNovoNome] = useState(nome); 
  
  const handleSaldoChange = (event) => {
    const novoValor = event.target.value;
    setNovoSaldo(novoValor);
  };

  const handleNomeChange = (event) => {
    const novoNome = event.target.value;
    setNovoNome(novoNome);
  };

  const salvarNovoSaldoENome = () => {
    setSaldo(novoSaldo);
    setNome(novoNome);
  };

  const limparDados = () => {
    setSaldo(0);
    setNome('');
    setParsedData([])
    console.log(parsedData);
  };

  return (
    <div className="TudoHome">

      <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setParsedData, parsedData)}
        accept=".csv"
      />
      <input
        type="number"
        onChange={handleSaldoChange}
        value={novoSaldo}
        placeholder="Informe seu novo saldo"
      />

      <input
        type="text"
        onChange={handleNomeChange}
        value={novoNome}
        placeholder="Informe seu novo nome"
      />
      <button onClick={salvarNovoSaldoENome}>
        Salvar Dados
      </button>
      <button onClick={limparDados}>
        Limpar Dados
      </button>
    </div>

  );
};

export default GiveInfos;