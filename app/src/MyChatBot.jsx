import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";
import assistente from './imgs/image.png'

const MyChatBot = () => {
 
  const options = {
    isOpen: false,
 
    theme: {
      primaryColor: '#5f50ff',
      secondaryColor: '#7135d1',
      embedded:false,
      showFooter:false,
      showHeader:true,
      showInputRow: false,
      
    },
    header: {
      title: (
          <h3 style={{cursor: "pointer", margin: 0}}>Assistente</h3>
      ),
      showAvatar: true,
      avatar: assistente,
    
    },
    tooltip: {
      mode: false,
      text: false,
    },
    chatHistory: {
      disabled: true,
    },
    chatInput:{
      disabled: true,
    },
    chatButton: {
      icon: false,
     
    },
    botBubble: {
      animate: true,
      showAvatar: false,
      avatar: assistente,
      simStream: true,
      streamSpeed: 25,
    },

    chatWindowStyle: { width: '95%', height: '93%', left:'5px'},
    headerStyle: {backgroundColor: "red"},
   
  };
  const flow = {
    start: {
      message: "Ei! Alguma duvida de como usar o CSV to see?",
      options: ["Graficos..", "Csv..", "Calendario..","Ver Arquivo..",'Resumo..'],
      path: "process_options"
    },
    process_options: {
      message: (params) => {
         
          switch (params.userInput) {
          case "Graficos..":
            return "Nos gráficos, você pode colocar o arquivo CSV, visualizar seus gastos, lucros e o total, tudo de forma visual. Também pode gerar um PDF com os graficos, caso queira.";
            
          case "Csv..":
            return "No arquivo csv, deve conter as Informaçoes do seu extrato, como: Data, Valor, etc..";
            
          case "Calendario..":
              return "No calendario é possivel ver qual dia/Mês/Ano quais são os valores gastos ou ver os lucros."
              
          case "Ver Arquivo..":
            return "Em ver arquivo, é possivel ver seu arquivo CSV, de forma simples e um tanto organizada com colunas adicionas";

          case "Resumo..":
            return "No Resumo você pode colocar uma data inicial até uma data final e com isso durante esse periodo, você pode ver os gastos,lucro,total etc.. E gerar um PDF disso";
            
          default:
              return "unknown_input";
          }
          
      },
      transition: {duration: 1},
      path: "loop"
    },
     loop: {
      message: "Mais Alguma duvida?",
      options: ["Graficos..", "Csv..", "Calendario..","Ver Arquivo..",'Resumo..'],
      path: "process_options"
    }, 
  }

  return (
    <ChatBot flow={flow} options={options} />
  );
};

export default MyChatBot;