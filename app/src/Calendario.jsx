import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Papa from "papaparse";

import React, { useState, useEffect,useContext } from 'react';
export function Calendario() {

  const [parsedData, setParsedData] = useState([]);
  const [cadaData, setCadaData] = useState([]);
  const [todosOsValores, setTodosOsValores] = useState([]);
  const [valoresNegativos, setValoresNegativos] = useState([]);
  const [valoresPositivos, setValoresPositivos] = useState([]);
  const handleFileChange = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setParsedData(results.data);
      },
    });
  };

  useEffect(() => {
    const formatarDatas = () => {
      const datasFormatadas = parsedData.map(item => {
        const partesData = item.Data.split('/');
        const dataFormatada = partesData.reverse() .join('-') ;
        return dataFormatada;
      });
      return datasFormatadas;
    };
    
    setTodosOsValores(percorerOsValores)
    const datasFormatadas = formatarDatas();
    
    setCadaData(datasFormatadas);
    console.log(datasFormatadas);
    
  }, [parsedData]);
  
  var percorerOsValores = []
  var percorerOsValoresNegativos = []
  var percorerOsValoresPositivos = []
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
      color: todosOsValores[index] >= 0 ? '#62ca1c' : '#d62727', // Definindo a cor com base no valor
      borderColor:'black',
      
    }));
    const todosEventos = [
      ...eventosCompletos,
    ];
     const dateClick = (info) => {
    alert('Date: ' + info.dateStr);
    alert('Resource ID: ' + info.resource.id);
  }
  return (
    <div>
      
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".csv"
      />
      <input type="date" />
      <input type="date" />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        /* eventColor = '#4ab31a' */
        /* events={cadaData.map(data => ({
          title: 'Evento',
          date: data,
        }))} */
        events={ todosEventos} 
      />
    </div>
  );
}

export default  Calendario;