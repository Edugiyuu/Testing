import React, { useState } from 'react';
import Input from './Input';
import '../public/style.css';
import Grafico from './grafico';



const App = () => {
  const [mandarArquivo, setMandarArquivo] = useState(false);

  // Função para lidar com o clique no botão
  function handleClick() {
    setMandarArquivo(true);
    if (mandarArquivo === true) {
      console.log("é true");
    }
  };

  return (
    <div>
  
      <Input />
     <Grafico/>
    </div>
  );
};

export default App;