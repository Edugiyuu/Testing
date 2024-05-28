import React, { useState, useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import handleFileChange from '../HandleFile';

export const GiveInfos = () => {
  const { saldo, setSaldo, nome, setNome, arquivoCsv, setArquivoCsv, totalPositivo, setTotalPositivo, totalNegativo, setTotalNegativo, totalFinal, setTotalFinal } = useContext(UserContext);
  const [novoSaldo, setNovoSaldo] = useState('');
  const [novoNome, setNovoNome] = useState('');

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
    
    fetch("http://localhost:3001/api/dadosDoUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Nome: novoNome, Categoria: '',Email: ''})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  };

  const limparDados = () => {
    setSaldo(0);
    setNome('');
    setArquivoCsv([]);
    fetch("http://localhost:3001/api/arquivos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  function atualizarTotais(arquivoCsv) {
    let totalPositivo = 0;
    let totalNegativo = 0;
    let totalFinal = 0;

    for (let i = 0; i < arquivoCsv.length; i++) {
      const valor = Number(arquivoCsv[i].Valor);
      if (valor > 0) {
        totalPositivo += valor;
      } else {
        totalNegativo += valor;
      }
      totalFinal += valor;
    }

    setTotalPositivo(Math.floor(totalPositivo));
    setTotalNegativo(Math.floor(totalNegativo));
    setTotalFinal(Math.floor(totalFinal));
  }

  return (
    <div className="TudoHome">
      <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setArquivoCsv, arquivoCsv, atualizarTotais)}
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
        placeholder="Informe seu nome"
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
