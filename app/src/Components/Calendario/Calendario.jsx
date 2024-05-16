import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Papa from "papaparse";
import handleFileChange from '../../HandleFile';
import React, { useState, useEffect, useContext } from 'react';
import multiMonthPlugin from '@fullcalendar/multimonth'
import "../Calendario/Calendario.css";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

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
    useEffect(() => {
    
      const containerEl = document.getElementById('external-events');
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText
          };
        }
      });
    }, []);
    const [anotacao, setAnotacao] = useState('');

  const handleAnotacaoChange = (event) => {
    setAnotacao(event.target.value);
  };
  return (
    <div className="Calendario">
       {/* <input
        type="file"
        name="file"
        onChange={(event) => handleFileChange(event, setParsedData, parsedData)}
        accept=".csv"
      /> */}
      <div>
      <input
        type="text"
        onChange={handleAnotacaoChange}
        value={anotacao}
        placeholder="Coloque uma anotação"
      />
      </div>
      
       <div id='external-events'>
    
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
          <div className='fc-event-main'>{anotacao}</div>
        </div>
      </div>
       
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin ]}
       
        droppable = {true }
        initialView="dayGridMonth"
        events={todosEventos}
        contentHeight={600}
         headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'prevYear,nextYear'
        }}
      />
    </div>
  );
}

export default Calendario;
