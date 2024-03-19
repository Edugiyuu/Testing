
import React, { useState } from 'react';
import Papa from "papaparse";
import XLSX from 'xlsx'
import { LineChart, Line } from 'recharts';
/* const Input = () => {
  const [arquivoCsv, setArquivoCsv] = useState('');
  const test = 'Coluna111,Edu,HELO'

 var csv = Papa.unparse({
	"fields": ["Column 1", "Column 2"],
	"data": [
		["foo", "bar"],
		["abc", "def"]
	]
}); 

  const handleFileChange = (event) => {
    const primeiraPlanilha = event.target.files[0];
    
      console.log(Papa.parse(test)); 
      Papa.parse(primeiraPlanilha, {
        complete: (result) => {
          setArquivoCsv(result.data);
        }
        
      });
      

  };

  return (
    <div>
      <input type="file" accept='.csv' onChange={handleFileChange} />
      <div>
        {arquivoCsv && (

          <p>{arquivoCsv}</p>
          
        )}
      </div>
    </div>
  );
};

export default Input;

 */

const Input = () => {
  

  const [parsedData, setParsedData] = useState([]);

  
  const [colunasDaTabela, setColunasDaTabela] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

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

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setColunasDaTabela(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
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
              return <th key={index}>{colunas}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {/* Valor da Coluna */}
          {values.map((valor, index) => {
            return (
              <tr key={index}>
                {valor.map((valor, i) => {
                  return <td key={i}>{valor}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Input;

