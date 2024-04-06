
import React, { useState, useEffect } from 'react';
import Papa from "papaparse";
import generatePDF, { Margin } from 'react-to-pdf';
import VerArquivoPDF from './VerArquivoPDF';
import { format } from 'date-fns';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer,  } from '@react-pdf/renderer';

import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar,Rectangle ,ResponsiveContainer, ReferenceLine,AreaChart,Area,PieChart,Pie, RadialBarChart,RadialBar} from "recharts";

const personalizacao = {
  // Baixar/Salvar = save / Abrir no navegador = open
  method: 'open',
  page: {
    // Definir a margem: SMALL ou MEDIUM 
    margin: Margin.MEDIUM,
    // Formato da página: A4 ou letter
    format: 'A4',
    // Orientação do arquivo: portrait ou landscape
    orientation: 'portrait',
  },
}


 const Grafico = () => {
    
    const [parsedData, setParsedData] = useState([]);
      
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);
  const [buttonLoaded, setButtonLoaded] = useState(false);

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

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          
        });
        setButtonLoaded(true);
        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setColunasDaTabela(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };
 

      console.log(parsedData);
      const [arrayDeObjetosGastos, setArrayDeObjetosGastos] = useState([]);
      const [arrayDeTodosOsNumeros, setArrayDeTodosOsNumeros] = useState([]);
      const [totalDeGastos, setTotalDeGastos] = useState(0);
      const [totalDeLucros, setTotalDeLucros] = useState(0);
      const [totalFinal, setTotalFinal] = useState(0);
      const [mesDeGastos, setMesDeGastos] = useState(0);
      const [mesesComMaisGastos, setMesesComMaisGastos] = useState([]);
      const [mesDeLucros, setMesDeLucros] = useState(0);

      useEffect(() => {
        const numeroMenor = [];
    let totalMenor = 0;
    const numeroMaior = [];
    const todosOsNumeros = []
    let totalMaior = 0;
    var mesComMaisLucro = '';
    var maiorValor = 0;
    var mesComMaisGasto = '';
     var mesesComMaisGastos = []; 
    var menorValor = 0;
     
    for (let i = 0; i < parsedData.length; i++) {
      
        if (parsedData[i].Valor < 0) {
            totalMenor += +parsedData[i].Valor;
            numeroMenor.push(parsedData[i].Valor);
            todosOsNumeros.push(parsedData[i].Valor);
            
            if (parsedData[i].Valor < menorValor) {
              
              menorValor = Number(parsedData[i].Valor);
              mesComMaisGasto = parsedData[i].Data;
              var diaMesAno = parsedData[i].Data.split('/')
              
              mesesComMaisGastos.push(diaMesAno[1])

              console.log(mesesComMaisGastos);
            } 
          
        } else {
            totalMaior += +parsedData[i].Valor;
            numeroMaior.push(parsedData[i].Valor);
            todosOsNumeros.push(parsedData[i].Valor);
            
            
            if (parsedData[i].Valor > maiorValor) {
              maiorValor = Number(parsedData[i].Valor);
              mesComMaisLucro = parsedData[i].Data; 
          }
        }
    }
  /*   const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


for (let i = 0; i < mesesComMaisGastos.length; i++) {
    const numeroDoMes = mesesComMaisGastos[i]; // Obtém o número do mês
    const nomeDoMes = meses[parseInt(numeroDoMes, 10) - 1]; 
    console.log(nomeDoMes);
} */
    console.log();
    setMesDeGastos(mesComMaisGasto)
    setMesDeLucros(mesComMaisLucro)
  
      setTotalDeGastos(totalMenor);
       setTotalDeLucros(totalMaior)
       
       
       const arrayDeNumerosDeObjetosTotais = todosOsNumeros.map(total => ({ total: parseFloat(total) }));
        setArrayDeTodosOsNumeros(arrayDeNumerosDeObjetosTotais);

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
      
      const recuperarConteudoParaPDF = () => {
        
       const conteudoElement = document.getElementById('conteudo');
       
        return conteudoElement
      };
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
        const data2 = [
          { name: 'Total Lucros', value2: totalDeGastos, fill: '#FF5733' },
          
        ];
        const gradientOffset = () => {
          const dataMax = Math.max(...arrayDeTodosOsNumeros.map((i) => i.total));
          const dataMin = Math.min(...arrayDeTodosOsNumeros.map((i) => i.total));
        
          if (dataMax <= 0) {
            return 0;
          }
          if (dataMin >= 0) {
            return 1;
          }
        
          return dataMax / (dataMax - dataMin);
        };
        
        const off = gradientOffset();
       
        
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

  <div id="conteudo" >
    {/* <div className='Mês'>
     <p>Mês/Dia Com mais Lucros: {mesesComMaisGastos}</p>
     <p>Mês/Dia Com mais Gastos: {mesDeGastos}</p>
    </div> */}
      
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
{/* 
      <PieChart width={700} height={700}>
        <Pie
         dataKey="value"
         data={data}
        innerRadius={80}
        outerRadius={160}
        label
        />
        <Pie
         dataKey="value"
         data={data2}
        innerRadius={80}
        outerRadius={900}
        label
        />
  
         <Legend />
        <Tooltip />
        </PieChart> */}

<AreaChart className='segundoGrafico'
        
          data={arrayDeTodosOsNumeros}
          width={1100} height={500} margin={{right: 9, bottom: 0, left: 100 ,top: 10}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#4fe708" /* stopOpacity={1}  *//>
              <stop offset={off} stopColor="#e20b0b"  />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="total" stroke="#000" fill="url(#splitColor)"/>
        </AreaChart>
        </div>

        {buttonLoaded && (
        <div className='gerarPDF'>
          <button onClick={() => generatePDF(recuperarConteudoParaPDF, personalizacao,)}>Gerar PDF</button>
        </div>
        )}

    </div>
  );
};

export default Grafico;

 