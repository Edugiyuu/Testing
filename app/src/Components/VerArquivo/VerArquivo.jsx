import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../VerArquivo/VerArquivo.css";
import { UserContext } from '../../Hooks/UserContext';
import DataTable from 'react-data-table-component';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const VerArquivo = () => {
  const { saldo, setSaldo, nome, setNome, arquivoCsv, setArquivoCsv } = useContext(UserContext);
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`http://localhost:3001/api/arquivos/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setArquivoCsv(data)
        console.log(data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNomeCategoria = (event) => {
    const novoNome = event.target.value;
    setNome(novoNome);
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'Categoria',
      headerName: 'Categoria',
      editable: true,
      sortable: false,
      width: 160,
    },
    {
      field: 'Data',
      headerName: 'Data',
      width: 110,
      editable: false,
    },
    {
      field: 'Valor',
      headerName: 'Valor',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'Identificador',
      headerName: 'Identificador',
      width: 300,
      editable: false,
    },
    {
      field: 'Descrição',
      headerName: 'Descrição',
      width: 300,
      editable: false,
    },
  ];

  return (
    <div className='VerArquivo'>
      <h1>{nome}</h1>
      <input type="text" onChange={handleNomeCategoria} />
      <button>Atualizar Categoria</button>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={arquivoCsv}
          columns={columns}
          
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default VerArquivo;
