import Papa from 'papaparse';
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
      for (let i = 0; i < results.data.length; i++) {
        parsedData.push(results.data[i]);
      }

      setParsedData(parsedData);
      localStorage.setItem('parsedData', JSON.stringify(parsedData));
      console.log(parsedData);
    },
  });
};

export default handleFileChange;