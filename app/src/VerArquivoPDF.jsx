
import React, { useState } from 'react';
import Papa from "papaparse";
import XLSX from 'xlsx'
import { LineChart, Line } from 'recharts';

const VerArquivoPDF = () => {
  

  const [parsedData, setParsedData] = useState([]);

  const [valoresJuntosArray, setValoresJuntosArray] = useState([]);
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  const [colunasDaTabelaExtras, setColunasDaTabelaExtras] = useState(['Tipo','Nomes','Dados Do Banco','Banco']);

  //State to store the values
  const [values, setValues] = useState([]);
  const [valuesExtras, setValuesExtras] = useState([]);

  const handleFileChange = (event) => {
    /* const primeiraPlanilha = event.target.files[0];
    console.log(primeiraPlanilha); */
     // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const valuesExtrasArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
        
          const todosOsValores = Object.values(d);
          todosOsValores.pop()
          valuesArray.push(todosOsValores)
          //valuesArray.push(Object.values(d));

          const todasAsColunas = Object.keys(d);
          todasAsColunas.pop()
          rowsArray.push(todasAsColunas)
          //rowsArray.push(Object.keys(d));


          valuesExtrasArray.push(Object.values(d['Descrição'].split(' - ')));
          console.log(todosOsValores);
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setColunasDaTabela(rowsArray[0]);

        // Filtered Values
        setValuesExtras(valuesExtrasArray)
        setValues(valuesArray);

        const valoresJuntosArray = valuesArray.map((value, index) => {
          return value.concat(valuesExtrasArray[index]);
      });
      setValoresJuntosArray(valoresJuntosArray);
      },
    });
  };

  return (
    <div>
     
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          {/* Colunas */}
          <tr>
            {colunasDaTabela.map((colunas, index) => {
              return <th key={index}>{colunas}</th> 
            })}
            {colunasDaTabelaExtras.map((colunas, index) => {
              return <th key={index}>{colunas}</th> 
            })}
          </tr>
        </thead>
        <tbody>
          {/* Valor da Coluna */}
          {valoresJuntosArray.map((valor, index) => {
            return (
              <tr key={index}>
                {valor.map((valor, i) => {
                  return <td className='valores'key={i}>{valor}</td>;
                })}
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
}

export default VerArquivoPDF;

