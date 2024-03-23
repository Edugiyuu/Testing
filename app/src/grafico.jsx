
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar,Rectangle ,ResponsiveContainer, ReferenceLine,AreaChart,Area} from "recharts";


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

      
      const [valorMenor, setValorMenor] = useState([]);
      const [arrayDeObjetosGastos, setArrayDeObjetosGastos] = useState([]);
      const [totalDeGastos, setTotalDeGastos] = useState(0);
      const [totalDeLucros, setTotalDeLucros] = useState(0);
      const [totalFinal, setTotalFinal] = useState(0);
      useEffect(() => {
        const numeroMenor = [];
        let totalMenor = 0;
        const numeroMaior = [];
        let totalMaior = 0;
    
        for (let i = 0; i < parsedData.length; i++) {
          if (parsedData[i].Valor < 0) {
            totalMenor += +parsedData[i].Valor;
            numeroMenor.push(parsedData[i].Valor);
          }else{
            totalMaior += +parsedData[i].Valor;
            numeroMaior.push(parsedData[i].Valor);
          }
        }
        setTotalDeGastos(totalMenor);
       setTotalDeLucros(totalMaior)
       setTotalFinal(totalDeGastos + totalDeLucros)

        const arrayDeObjetosNegativos = numeroMenor.map(gasto => ({ gasto: parseFloat(gasto) }));
        setArrayDeObjetosGastos(arrayDeObjetosNegativos);
      
      }, [parsedData]);

      console.log(totalFinal);
      console.log(totalDeGastos);

      const [valorColocado, setValorColocado] = useState(0);

      const valorEstimado = (event) => {
        const valorDigitado = event.target.value;
        setValorColocado(valorDigitado)
        console.log(valorColocado);
      }
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      <input
        type='number'
        name="valorEstimado"
        onChange={valorEstimado}
        placeholder='Coloque um valor que você predendia gastar..'
      />
    {/* <LineChart width={1100} height={500} data={parsedData} margin={{top:30,right: 9, bottom: 5, left: 100 }}>
    <Line type="monotone" dataKey="ano" stroke="#2196F3" strokeWidth={3} />
    <Line width={500} type="monotone"dataKey='Valor'stroke="#F44236"strokeWidth={3} />
    <Line type="monotone" dataKey="test" stroke="#FFCA29" strokeWidth={3} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
  </LineChart> */}
  {/*--------------------------------------------- */}
  
 {/*  <BarChart width={1100} height={500} data={arrayDeObjetosGastos} margin={{right: 9, bottom: 5, left: 100 }}>
    <XAxis dataKey="name"/>
    <YAxis />
    <Tooltip  />
    <Legend />
    
    <Bar dataKey="gasto" fill="#eb4022" barSize={30} />
  </BarChart> */}

  
  <BarChart width={1100} height={500} margin={{right: 9, bottom: 0, left: 100 ,top: 10}} data={[{ 
    name: "Total de Gastos", total: Math.floor(totalDeGastos),
    name: "Total de Lucro",total2: Math.floor(totalDeLucros),
    name: "Total Es",total3: valorColocado,
    name: "Total Final",total4: Math.floor(totalFinal),
    }]}>
      <Legend />
        <XAxis dataKey='name2' />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Bar name='Total De Gastos'dataKey="total" barSize={30} fill="#ca0404" />
        <Bar name='Total De Lucros'dataKey="total2" barSize={30} fill="#43ca04" />
        <Bar name='Total Pretendido'dataKey="total3" barSize={30} fill="#570d9c" />
        <Bar name='Total Final'dataKey="total4" barSize={30} fill="#f3ef20" />
      </BarChart>
     
      
     
    </div>
  );
};

export default Grafico;

 