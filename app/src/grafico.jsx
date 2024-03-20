
import React, { useState } from 'react';
import Papa from "papaparse";
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar} from "recharts";


 const Grafico = () => {
    /* const data = [
        { ano: "2017", primeiroNumero: 32, segundoNumero: 37, },
        { ano: "2018", primeiroNumero: 42, segundoNumero: 42},
        { ano: "2019", primeiroNumero: 51, segundoNumero: 41},
        { ano: "2020", primeiroNumero: 60, segundoNumero: 37},
        { ano: "2021", primeiroNumero: 51, segundoNumero: 31},
        { ano: "2022", primeiroNumero: 95, segundoNumero: 44},
      ]; */
      const [parsedData, setParsedData] = useState([]);

  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    /* const primeiraPlanilha = event.target.files[0];
    console.log(primeiraPlanilha); */
     // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        console.log(results.data)
        const dinheiro = []

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
    const data = [
        { primeiroNumero: 32, segundoNumero: 37, },
        { primeiroNumero: 42, segundoNumero: 42},
        { primeiroNumero: 51, segundoNumero: 41},
        { primeiroNumero: 60, segundoNumero: 37},
        {  primeiroNumero: 51, segundoNumero: 31},
        {  primeiroNumero: 95, segundoNumero: 44},
      ];
      for (let i = 0; i < parsedData.length; i++) {

        if (parsedData[i].Valor < 0) {
       
        }
        
      }
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
    <LineChart width={1200} height={500} data={parsedData} margin={{ top: 25, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="ano" stroke="#2196F3" strokeWidth={3} />
    <Line width={500} type="monotone"dataKey='Valor'stroke="#F44236"strokeWidth={3} />
    <Line type="monotone" dataKey="segundoNumero" stroke="#FFCA29" strokeWidth={3} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
  </LineChart>
  {/*--------------------------------------------- */}
  <BarChart width={1200} height={500} data={parsedData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
    <XAxis dataKey="name"/>
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend />
    <CartesianGrid stroke="#ccc" />
    <Bar dataKey="Valor" fill="#eb4022" barSize={30} />
  </BarChart>
  </div>
  );
};

export default Grafico;

 