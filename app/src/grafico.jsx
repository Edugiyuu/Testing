
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar,Rectangle ,ResponsiveContainer, ReferenceLine,AreaChart,Area,PieChart,Pie, RadialBarChart,RadialBar} from "recharts";


 const Grafico = () => {
    
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
       

        const arrayDeObjetosNegativos = numeroMenor.map(gasto => ({ gasto: parseFloat(gasto) }));
        setArrayDeObjetosGastos(arrayDeObjetosNegativos);
      
      }, [parsedData]);
      useEffect(() =>{
        setTotalFinal(totalDeGastos + totalDeLucros)
      },[totalDeGastos||totalDeLucros])



      const [valorColocado, setValorColocado] = useState(0);

      const valorEstimado = (event) => {
        const valorDigitado = event.target.value;
        setValorColocado(valorDigitado)
      }
      
      const dataInfo =[{ 
        name: "Total de Gastos", total: Math.floor(totalDeGastos),
        name: "Total de Lucro",total2: Math.floor(totalDeLucros),
        name: "Total Es",total3: valorColocado,
        name: "Total Final",total4: Math.floor(totalFinal),
        }]
        const dataInfoJunto =[
          { name: "Total de Gastos", value: Math.floor(totalDeGastos)},
          { name: "Total de Lucro",value: Math.floor(totalDeLucros)}
        ];
        const data = [
          { name: 'Total Lucros', value: totalDeLucros, fill: '#FF5733' },
          { name: 'Total Esperado', value: valorColocado, fill: '#33FF57' },
          { name: 'Outro Valor', value: totalDeLucros, fill: '#5733FF' },
          { name: 'Total Final', value: Math.floor(totalFinal), fill: '#d2fd12' }
        ];
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
  
  <BarChart className='primeiroGrafico'width={1100} height={500} margin={{right: 9, bottom: 0, left: 100 ,top: 10}} data={dataInfo} barGap={15}>
      <Legend stroke='#add8e6'/>
        <XAxis dataKey='name2' />
        <YAxis stroke="#000000"/>
        <Tooltip />
        <CartesianGrid stroke="#add8e6" />
        <Bar name='Total De Gastos'dataKey="total" barSize={35} fill="#ca0404" baseProfile={9} />
        <Bar name='Total De Lucros'dataKey="total2" barSize={35} fill="#43ca04" />
        <Bar name='Total Pretendido'dataKey="total3" barSize={35} fill="#570d9c"  />
        <Bar name='Total Final'dataKey="total4" barSize={35} fill="#d8d51f" />
      </BarChart>


      <PieChart width={700} height={700}>
  <Pie
    dataKey="value"
    data={data}
    // Ajuste para centralizar verticalmente
    innerRadius={40}
    outerRadius={80}
    
    label // Ativando a exibição dos valores dentro do gráfico
  />
  
  <Legend />
  <Tooltip />
</PieChart>



 

      {/* <PieChart width={400} height={400}>
          <Pie
            data={dataInfo}
            cx="50%"
            cy="50%"
            labelLine={false}
           
            outerRadius={80}
            fill="#8884d8"
            dataKey="segundoNumero"
          >
           
          </Pie>
        </PieChart> */}

    </div>
  );
};

export default Grafico;

 