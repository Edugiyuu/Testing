
import React, { useState,useContext,useEffect} from 'react';
import Papa from "papaparse";
import XLSX from 'xlsx'
import { LineChart, Line } from 'recharts';
import "../VerArquivo/VerArquivo.css";
import { UserContext } from '../../Hooks/UserContext';
import { useParams } from 'react-router-dom';
const VerArquivo = () => {
  
  const {saldo, setSaldo, nome, setNome,arquivoCsv, setArquivoCsv} = useContext(UserContext);

  const [valoresJuntosArray, setValoresJuntosArray] = useState([]);
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  const [colunasEscondidas, setColunasEscondidas] = useState(false);
  const [colunasDaTabelaExtras, setColunasDaTabelaExtras] = useState(['Tipo','Nomes','CPF','Banco']);

  const [values, setValues] = useState([]);
  const [valuesExtras, setValuesExtras] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:3001/api/arquivos")
      .then((res) => res.json())
      .then((data) => {
       console.log(data[id]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleFileChange = (event) => {
     // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const valuesExtrasArray = [];

        results.data.map((d) => {
        
          const todosOsValoresEmObj = Object.values(d);
          console.log(todosOsValoresEmObj);
          todosOsValoresEmObj.pop()
          valuesArray.push(todosOsValoresEmObj)
          console.log(valuesArray);
          //valuesArray.push(Object.values(d));

          const todasAsColunas = Object.keys(d);
          todasAsColunas.pop()
          rowsArray.push(todasAsColunas)
          //rowsArray.push(Object.keys(d));


          valuesExtrasArray.push(Object.values(d['Descrição'].split(' - ')));
          
        });

        
        setArquivoCsv(results.data);

        
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

