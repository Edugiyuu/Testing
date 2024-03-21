
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar, ResponsiveContainer, ReferenceLine} from "recharts";


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

      const [gasto, setGasto] = useState(0);
      const [valorMenor, setValorMenor] = useState([]);
      const [arrayDeObjetosGastos, setArrayDeObjetos] = useState([]);
      
      useEffect(() => {
        const numeroMenor = [];
        const totalDeGastos = [];
      
        for (let i = 0; i < parsedData.length; i++) {
          if (parsedData[i].Valor < 0) {
            numeroMenor.push(parsedData[i].Valor);
          }
        }
      
        setGasto(numeroMenor); 
      
        const arrayObjetos = numeroMenor.map(gasto => ({ gasto: parseFloat(gasto) }));
        setArrayDeObjetos(arrayObjetos);
      
      }, [parsedData]);

      console.log(arrayDeObjetosGastos);
      

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
    <Line type="monotone" dataKey="test" stroke="#FFCA29" strokeWidth={3} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
  </LineChart>
  {/*--------------------------------------------- */}
  <BarChart width={1200} height={500} data={arrayDeObjetosGastos} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
    <XAxis dataKey="name"/>
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend />
    
    <Bar dataKey="gasto" fill="#eb4022" barSize={30} />
  </BarChart>

  
  <BarChart width={600} height={300} data={arrayDeObjetosGastos}>
    <XAxis dataKey='gasto' tick="{renderCustomAxisTick}" />
    <XAxis dataKey="name"/>
    <Tooltip />
    <Legend />
    <Bar dataKey="uv" barSize={30} fill="#8884d8"
      label='{renderCustomBarLabel}'/>
  </BarChart>

  <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={arrayDeObjetosGastos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gasto" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  </div>
  );
};

export default Grafico;

 