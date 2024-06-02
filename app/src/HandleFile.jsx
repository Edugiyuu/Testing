import Papa from 'papaparse';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './Hooks/UserContext';
/*  const handleFileChange = (event, setParsedData) => {
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setParsedData(results.data);
      localStorage.setItem('parsedData', JSON.stringify(results.data)); // Salva os dados no localStorage
    },
  });
};  */

// pra não confundir eu deixei os parametros iguais ao valores reais
/* const handleFileChange = (event, setParsedData, parsedData) => {
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const newParsedData = parsedData.concat(results.data);
      setParsedData(newParsedData);
      localStorage.setItem('parsedData', JSON.stringify(newParsedData));
    },
  });
}; */

 const handleFileChange = (event, setArquivoCsv, arquivoCsv, atualizarTotais) => {
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const arquivoAtualCsv = results.data;

      for (let i = 0; i < arquivoAtualCsv.length; i++) {
        arquivoAtualCsv[i].Categoria = "Sem Categoria";
      }

      fetch("http://localhost:3001/api/arquivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arquivoAtualCsv), 
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(arquivoAtualCsv[0].Categoria);
        console.log(arquivoAtualCsv[0].Descrição);
      })
      .catch((error) => {
        console.error(error);
      });

      
      const arquivoCsvFinal = arquivoCsv.concat(arquivoAtualCsv);
      
      console.log(arquivoCsv);
      console.log(arquivoAtualCsv);
      console.log(arquivoCsvFinal);
      
      setArquivoCsv(arquivoCsvFinal);
      atualizarTotais(arquivoCsvFinal);
    },
  });
};

export default handleFileChange;