import React from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const options = {
		
		theme: {
			embedded: true,
			primaryColor: "#a41af4",
			secondaryColor: "#070707",
      
		},
		chatHistory: {
			storageKey: "example_theming"
		}}
  const flow = {
    start: {
      message: "Ei! Alguma duvida de como usar o CSV to see?",
      options: ["Graficos", "Csv", "Discord"],
      path: "process_options"
    },
    process_options: {
      message: (params) => {
          let link = "";
          switch (params.userInput) {
          case "Examples":
              link = "https://react-chatbotify.tjtanjin.com/docs/examples/basic_form";
              break;
          case "Github":
              link = "https://github.com/tjtanjin/react-chatbotify/";
              break;
          case "Discord":
              link = "https://discord.gg/6R4DK4G5Zh";
              break;
          default:
              return "unknown_input";
          }
          setTimeout(() => {
              window.open(link);
          }, 1000)
          return `Sit tight! I'll send you to ${params.userInput}!`;
      },
      transition: {duration: 1},
      path: "loop"
    },
   /*  loop: {
      message: "Do you need any more help?",
      options: ["Examples", "Github", "Discord"],
      path: "process_options"
    }, */
  }

  return (
    <ChatBot flow={flow} options={options}/>
  );
};

export default MyChatBot;