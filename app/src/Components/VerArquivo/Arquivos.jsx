import React, { useContext } from 'react';
import "../VerArquivo/Arquivos.css";
import { UserContext } from '../../Hooks/UserContext';
import { NavLink } from 'react-router-dom';

const Arquivos = () => {
  const { cadaArquivoCsv, setCadaArquivoCsv } = useContext(UserContext);

  if (cadaArquivoCsv == []) {
    setCadaArquivoCsv()
  }
  return (
    <div className='Arquivos'>
      <h1>Seus Arquivos: </h1>
      {cadaArquivoCsv.map((arquivo, index) => (
        <div className='CaixasDeArquivos'>
          <h2>Arquivo numero {index + 1}</h2>
          <p>Quantidade de itens: {arquivo.length}</p>
          <p>Index {index}</p>
          <NavLink className={'NavLink'} to={`/verArquivo/`}>Arquivos</NavLink>
        </div>
      ))}
    </div>
  );
}

export default Arquivos;
