
import React, { useState,useContext,useEffect,useMemo} from 'react';
import Papa from "papaparse";
import { useTable } from "react-table";
import "../VerArquivo/VerArquivo.css";
import { UserContext } from '../../Hooks/UserContext';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
const VerArquivo = () => {
  
  const {saldo, setSaldo, nome, setNome,arquivoCsv, setArquivoCsv} = useContext(UserContext);

  /* const [valoresJuntosArray, setValoresJuntosArray] = useState([]);
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  const [colunasEscondidas, setColunasEscondidas] = useState(false);
  const [colunasDaTabelaExtras, setColunasDaTabelaExtras] = useState(['Tipo','Nomes','CPF','Banco']);
  const [novoNome, setNovoNome] = useState('');
  const [values, setValues] = useState([]);
  const [valuesExtras, setValuesExtras] = useState([]);*/
  const { id } = useParams(); 

   const handleNomeCategoria = (event) => {
    const novoNome = event.target.value;
    setNovoNome(novoNome);
  }; 
  useEffect(() => {
    fetch("http://localhost:3001/api/arquivos")
      .then((res) => res.json())
      .then((data) => {
       console.log(data[id]);
       setArquivoCsv(data[id])
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const columns = [
    {
      name: 'Categoria',
      selector: row => row.Categoria,
    },
    {
      name: 'Data',
      selector: row => row.Data,
    },
    {
      name: 'Valor',
      selector: row => row.Valor,
    },
    {
      name: 'Identificador',
      selector: row => row.Identificador,
    },
    {
      name: 'Descrição',
      selector: row => row.Descrição,
    },
  ];
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState([]);
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    console.log(state.selectedRows);
  }, []);
  const handleDelete = () => {
    if (window.confirm(`Atualizar categorias dos itens selecionados?`)) {
      
     
    }
  };
  // VIDEO -> https://www.youtube.com/watch?v=A9oUTEP-Q84&t=1102s&ab_channel=PedroTech
 /*  const data = useMemo(() => arquivoCsv, [arquivoCsv]);
  const columns = useMemo(
    () => [
      {
        Header: "Categoria",
        accessor: "Categoria",
      },
      {
        Header: "Data",
        accessor: "Data",
      },
      {
        Header: "Valor",
        accessor: "Valor",
      },
      {
        Header: "Identificador",
        accessor: "Identificador",
      },
      {
        Header: "Descrição",
        accessor: "Descrição",
      },
      
    
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }); */

  /* const handleFileChange = (event) => {
     // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        const valuesExtrasArray = [];

        results.data.map((d) => {
        
          const todosOsValoresEmObj = Object.values(d);
          console.log(todosOsValoresEmObj);
          todosOsValoresEmObj.pop()
          valuesArray.push(todosOsValoresEmObj)
          console.log(valuesArray);
          //valuesArray.push(Object.values(d));

          const todasAsColunas = Object.keys(d);
          todasAsColunas.pop()
          rowsArray.push(todasAsColunas)
          //rowsArray.push(Object.keys(d));


          valuesExtrasArray.push(Object.values(d['Descrição'].split(' - ')));
          
        });

        
        setArquivoCsv(results.data);

        
        setColunasDaTabela(rowsArray[0]);

        
        setValuesExtras(valuesExtrasArray)
        setValues(valuesArray);

        const valoresJuntosArray = valuesArray.map((value, index) => {
          return value.concat(valuesExtrasArray[index]);
      });
      setColunasEscondidas(true)
      setValoresJuntosArray(valoresJuntosArray);
      },
    });
  }; */

  return (
    <div className='VerArquivo'>
      <h1>{nome}</h1>
  
      <input type="text" onChange={handleNomeCategoria}/>
      <button key="delete" onClick={handleDelete}>Atualizar Categoria</button>
      <DataTable
			columns={columns}
			data={arquivoCsv}
      selectableRows
      fixedHeader
      onSelectedRowsChange={handleRowSelected}
		/>

    </div>
  );
}

export default VerArquivo;

