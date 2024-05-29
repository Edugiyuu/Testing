
import React, { useState,useContext,useEffect,useMemo} from 'react';
import Papa from "papaparse";
import { useTable } from "react-table";
import "../VerArquivo/VerArquivo.css";
import { UserContext } from '../../Hooks/UserContext';
import { useParams } from 'react-router-dom';
const VerArquivo = () => {
  
  const {saldo, setSaldo, nome, setNome,arquivoCsv, setArquivoCsv} = useContext(UserContext);

  const [valoresJuntosArray, setValoresJuntosArray] = useState([]);
  const [colunasDaTabela, setColunasDaTabela] = useState([]);
  const [colunasEscondidas, setColunasEscondidas] = useState(false);
  const [colunasDaTabelaExtras, setColunasDaTabelaExtras] = useState(['Tipo','Nomes','CPF','Banco']);

  const [values, setValues] = useState([]);
  const [valuesExtras, setValuesExtras] = useState([]);
  const { id } = useParams();
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

  // VIDEO -> https://www.youtube.com/watch?v=A9oUTEP-Q84&t=1102s&ab_channel=PedroTech
  const data = useMemo(() => arquivoCsv, [arquivoCsv]);
  const columns = useMemo(
    () => [
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
      {
        Header: "Categoria",
        accessor: "Categoria",
      },
    
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
  
      <br />
      <br />
      {/* Table */}
      <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className='valores'{...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
  );
}

export default VerArquivo;

