import React, { useContext } from 'react';
import "../VerArquivo/Arquivos.css";
import { UserContext } from '../../Hooks/UserContext';
import { NavLink } from 'react-router-dom';

const Arquivos = () => {
  const { cadaArquivoCsv, setCadaArquivoCsv } = useContext(UserContext);
  console.log(cadaArquivoCsv);
  return (
    <div className='Arquivos'>
      <h1>Seus Arquivos: </h1>
      {cadaArquivoCsv.length === 0 ? (
        <div className='SemArquivo'>
          <h2 >Você não tem arquivos no momento</h2>
          <NavLink className='NavLink2' to={`/editar`}>Mandar Arquivo aqui</NavLink>
        </div>
       
        
      ) : (
        cadaArquivoCsv.map((arquivo, index) => (
          <div key={index} className='CaixasDeArquivos'>
            <h2 className='numeroDoArquivo'>Arquivo número {index + 1}</h2>
            <p className='numeroDeItens'>Quantidade de itens: {arquivo.length}</p>
            <p className='IndexDoArquivo'>Index {index}</p>
            <NavLink className='NavLink' to={`/verArquivo/${index}`}>Ver Arquivo</NavLink>
          </div>
        ))
      )}
    </div>
  );
}

export default Arquivos;