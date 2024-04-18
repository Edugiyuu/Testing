import React, { useState } from 'react';
import Papa from "papaparse";

const Resumo = () => {
  const [parsedData, setParsedData] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const handleFileChange = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
      },
    });
  };

  const handleDataInicioChange = (event) => {
    setDataInicio(event.target.value);
  };
  
  const handleDataFimChange = (event) => {
    setDataFim(event.target.value);
  };
  const calcularGastosLucros = () => {
    let total = 0;
    let lucros = 0;
    let gastos = 0;
  
    for (let i = 0; i < parsedData.length; i++) {
      //NÂO TIRAR O .split("/").reverse().join("-") já que o javascript não entende que é uma data ele acha que é uma string normal
      const dataFormatada = parsedData[i].Data.split("/").reverse().join("-");
      const valor = Number(parsedData[i].Valor);
  
      if (dataFormatada >= dataInicio && dataFormatada <= dataFim) {
        total += valor;
  
        if (valor >= 0) {
          lucros += valor;
        } else {
          gastos += valor;
        }
      }
    }
  
    return {
      total: total,
      lucros: lucros,
      gastos: gastos
    };
  };
  const calcularLucros = () => {
    let positivo = 0
    for (let i = 0; i < parsedData.length; i++) {
      const dataFormatada = parsedData[i].Data.split("/").reverse().join("-");
      if (dataFormatada >= dataInicio && dataFormatada <= dataFim) {
        if (parsedData[i].Valor >= 0) {
        positivo += Number(parsedData[i].Valor);
        }
      }
    }
    return positivo;
  };
  const totalGastosLucros = calcularGastosLucros();

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      
      <div className="inicioEfim">
        <h2>Inicio</h2>
        <input className='inicio' type="date" value={dataInicio} onChange={handleDataInicioChange} />
        <h2>Fim</h2>
        <input className='fim' type="date" value={dataFim} onChange={handleDataFimChange} />
      </div>
      
      <div>
        <span>Total: R$ {Math.floor(totalGastosLucros.total)}</span>
        <span>Gastos: R$ {Math.floor(totalGastosLucros.gastos)}</span>
        <span>Lucros: R$ {Math.floor(totalGastosLucros.lucros)} </span>
    </div>


      
      
    </div>
  );
}

export default Resumo;
