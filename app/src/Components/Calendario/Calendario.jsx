import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Papa from "papaparse";
import handleFileChange from '../../HandleFile';
import React, { useState, useEffect, useContext } from 'react';
import multiMonthPlugin from '@fullcalendar/multimonth'
import "../Calendario/Calendario.css";
import { UserContext } from "../../Hooks/UserContext";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

export function Calendario() {
  const {saldo,nome,arquivoCsv,totalPositivo,totalNegativo,totalFinal} = useContext(UserContext);
 
  const [cadaData, setCadaData] = useState([]);
  const [todosOsValores, setTodosOsValores] = useState([]);
  const [valoresNegativos, setValoresNegativos] = useState([]);
  const [valoresPositivos, setValoresPositivos] = useState([]);

  useEffect(() => {
    const formatarDatas = () => {
      const datasFormatadas = arquivoCsv.map(item => {
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
    
  }, [arquivoCsv]);

  var percorerOsValores = [];
  var percorerOsValoresNegativos = [];
  var percorerOsValoresPositivos = [];
  useEffect(() => {
    for (let i = 0; i < arquivoCsv.length; i++) {
      
      percorerOsValores.push(arquivoCsv[i].Valor);
      if (arquivoCsv[i].Valor < 0) {
        percorerOsValoresNegativos.push(arquivoCsv[i].Valor)
        setValoresNegativos(percorerOsValoresNegativos)
      }else{
        percorerOsValoresPositivos.push(arquivoCsv[i].Valor)
        setValoresPositivos(percorerOsValoresPositivos)
      }
      
    }  }, [arquivoCsv])
        

    const eventosCompletos = cadaData.map((data, index) => ({
      title: `R$ ${todosOsValores[index]}`,
      date: data,
      color: todosOsValores[index] >= 0 ? '#62ca1c' : '#d62727',
      borderColor:'black',
      
    }));
    const todosEventos = [
      ...eventosCompletos,
    ];
    console.log(arquivoCsv);
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
