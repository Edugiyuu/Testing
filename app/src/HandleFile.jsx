import Papa from 'papaparse';
import { useEffect } from 'react';
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

 // tem como fazer com o for tambem só que com o concat é melhor
 const handleFileChange = (event, setParsedData, parsedData) => {
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const parsedDataArray = [];
      for (let i = 0; i < results.data.length; i++) {
        parsedDataArray.push(results.data[i]);
      }
      fetch("http://localhost:3001/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedDataArray), 
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

      setParsedData(parsedDataArray);
      console.log(parsedDataArray);

      //recarregar a pagina já que as informaçoes só atualizam se atualizar a pagina..
      //location.reload();
    },
  });
};

export default handleFileChange;