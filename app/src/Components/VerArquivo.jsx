
import React, { useState,useContext} from 'react';
import Papa from "papaparse";
import XLSX from 'xlsx'
import { LineChart, Line } from 'recharts';
import "../VerArquivo.css";
import { UserContext } from '../Hooks/UserContext';
const VerArquivo = () => {
  
  const {saldo, setSaldo, nome, setNome } = useContext(UserContext);
  const [parsedData, setParsedData] = useState([]);

  const [valoresJuntosArray, setValoresJuntosArray] = useState([]);
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  const [colunasEscondidas, setColunasEscondidas] = useState(false);
  const [colunasDaTabelaExtras, setColunasDaTabelaExtras] = useState(['Tipo','Nomes','CPF','Banco']);

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

        
        setParsedData(results.data);

        
        setColunasDaTabela(rowsArray[0]);

        
        setValuesExtras(valuesExtrasArray)
        setValues(valuesArray);

        const valoresJuntosArray = valuesArray.map((value, index) => {
          return value.concat(valuesExtrasArray[index]);
      });
      setColunasEscondidas(true)
      setValoresJuntosArray(valoresJuntosArray);
      },
    });
  };

  return (
    <div className='VerArquivo'>
      <h1>{nome}</h1>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      <br />
      <br />
      {/* Table */}
      <table className='tabela'>
        <thead>
          {/* Colunas */}
          <tr>
            {colunasDaTabela.map((colunas, index) => {
              return <th key={index}>{colunas}</th>;
            })}
            {colunasEscondidas &&
              colunasDaTabelaExtras.map((coluna, index) => (
                <th key={index}>{coluna}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* valor da Coluna */}
          {valoresJuntosArray.map((valor, index) => {
            return (
              <tr key={index}>
                {valor.map((valor, i) => {
                  return (
                    <td className="valores" key={i}>
                      {valor}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VerArquivo;

