import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Papa from "papaparse";
import handleFileChange from './HandleFile';
import React, { useState, useEffect, useContext } from 'react';

export function Calendario() {
  
  const [parsedData, setParsedData] = useState(
    JSON.parse(localStorage.getItem('parsedData')) || []
    // aqui ele está pegando a chave que está no HandleFile.jsx e
  );
  const [cadaData, setCadaData] = useState([]);
  const [todosOsValores, setTodosOsValores] = useState([]);
  const [valoresNegativos, setValoresNegativos] = useState([]);
  const [valoresPositivos, setValoresPositivos] = useState([]);

  useEffect(() => {
    const formatarDatas = () => {
      const datasFormatadas = parsedData.map(item => {
        const partesData = item.Data.split('/');
        const dataFormatada = partesData.reverse().join('-');
        return dataFormatada;
      });
      return datasFormatadas;
    };
    
    setTodosOsValores(percorerOsValores)
    const datasFormatadas = formatarDatas();
    
    setCadaData(datasFormatadas);
    console.log(datasFormatadas);
    
  }, [parsedData]);

  var percorerOsValores = [];
  var percorerOsValoresNegativos = [];
  var percorerOsValoresPositivos = [];
  useEffect(() => {
    for (let i = 0; i < parsedData.length; i++) {
      
      percorerOsValores.push(parsedData[i].Valor);
      if (parsedData[i].Valor < 0) {
        percorerOsValoresNegativos.push(parsedData[i].Valor)
        setValoresNegativos(percorerOsValoresNegativos)
      }else{
        percorerOsValoresPositivos.push(parsedData[i].Valor)
        setValoresPositivos(percorerOsValoresPositivos)
      }
      
    }  }, [parsedData])
        
   
    const todosOsValoresCompletos = todosOsValores.map(title => ({title: Number(title),}))
    
    

    console.log(todosOsValoresCompletos);

    const eventosCompletos = cadaData.map((data, index) => ({
      title: `R$ ${todosOsValores[index]}`,
      date: data,
      color: todosOsValores[index] >= 0 ? '#62ca1c' : '#d62727',
      borderColor:'black',
      
    }));
    const todosEventos = [
      ...eventosCompletos,
    ];
    console.log(parsedData);
    
  return (
    <div>
       <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setParsedData, parsedData)}
        accept=".csv"
      />
       
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={todosEventos} 
      />
    </div>
  );
}

export default Calendario;
