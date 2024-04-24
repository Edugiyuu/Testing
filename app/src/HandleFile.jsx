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


  const handleFileChange = (event, setParsedData, currentData) => {
  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const newParsedData = [...currentData];

      for (let i = 0; i < results.data.length; i++) {
       newParsedData.push(results.data[i]);
      } 
      
      setParsedData(newParsedData);
      localStorage.setItem('parsedData', JSON.stringify(newParsedData)); // Atualiza o localStorage
      //                     ^^ aqui ele cria o parsedData no local storage 
    },
  });
}; 
 


export default handleFileChange;
