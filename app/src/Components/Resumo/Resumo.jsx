import React, { useState,useContext } from 'react';
import { UserContext } from '../../Hooks/UserContext';
import Papa from "papaparse";
import "../Resumo/Resumo.css";

const Resumo = () => {
  const {saldo, setSaldo, nome, setNome,arquivoCsv, setArquivoCsv} = useContext(UserContext);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const handleDataInicio = (event) => {
    setDataInicio(event.target.value);
  };
  
  const handleDataFim = (event) => {
    setDataFim(event.target.value);
  };
  const calcularGastosLucros = () => {
    let total = 0;
    let lucros = 0;
    let gastos = 0;
    let maiorLucro = 0
    let maiorGasto = 0
    let descDoMaiorLucro = ''
  
    for (let i = 0; i < arquivoCsv.length; i++) {
      //NÂO TIRAR O .split("/").reverse().join("-") já que o javascript não entende que é uma data ele acha que é uma string normal
      const dataFormatada = arquivoCsv[i].Data.split("/").reverse().join("-");
      const valor = Number(arquivoCsv[i].Valor);
      const descricaoFormatada = arquivoCsv[i].Descrição;

  
      if (dataFormatada >= dataInicio && dataFormatada <= dataFim) {
        total += valor;
  
        if (valor >= 0) {
          lucros += valor;
          if (valor > maiorLucro) {
            maiorLucro = valor
          descDoMaiorLucro = descricaoFormatada
          }
        } else {
          gastos += valor;
          if (valor < maiorGasto) {
            maiorGasto = valor
          }
        }
      }
    };
  
    return {
      total: total,
      lucros: lucros,
      gastos: gastos,
      maiorLucro:maiorLucro,
      maiorGasto:maiorGasto,
      descDoMaiorLucro: descDoMaiorLucro
    };
  };

  const totalGastosLucros = calcularGastosLucros();

  return (
    <div>
      
      
      <div className="inicioEfim">
        <h2>Inicio</h2>
        <input className='inicio' type="month"value={dataInicio} onChange={handleDataInicio} />
        <h2>Fim</h2>
        <input className='fim' type="month" value={dataFim} onChange={handleDataFim} />
      </div>
      
      <div className='resumo'>
        <p>Total: R$ {Math.floor(totalGastosLucros.total)}</p>
    
        <p>Gastos: R$ {Math.floor(totalGastosLucros.gastos)}</p>
  
        <p>Lucros: R$ {Math.floor(totalGastosLucros.lucros)} </p>

        <p>Maior Lucro: R$ {Math.floor(totalGastosLucros.maiorLucro)}</p>
        <p>Descrição do Maior Lucro: R$ {Math.floor(totalGastosLucros.descDoMaiorLucro)}</p>
        
        <p>Maior Gasto: R$ {Math.floor(totalGastosLucros.maiorGasto)}</p>
        
    </div>
    <button onClick={() => generatePDF(/* recuperarConteudoParaPDF, personalizacao, */)}>Gerar PDF</button>

    </div>
  );
}

export default Resumo;
