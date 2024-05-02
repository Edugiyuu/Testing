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
// handleFile.jsx
const handleFileChange = (event, setParsedData, parsedData, setContadorDeTransacao, setTotalDeGastos, setTotalDeLucros) => {
  let totalGastos = Number(localStorage.getItem('totalGastos')) || 0;
  let totalLucros = Number(localStorage.getItem('totalLucros')) || 0;

  Papa.parse(event.target.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      let contador = localStorage.getItem('contador') || 0;
      for (let i = 0; i < results.data.length; i++) {
        parsedData.push(results.data[i]);
        contador++;

        // Aqui você pode calcular os totais de gastos e lucros
        const valor = Number(results.data[i].Valor);
        if (valor < 0) {
          totalGastos += valor;
        } else {
          totalLucros += valor;
        }
        var valorTotal = totalGastos + totalLucros;
      }

      setParsedData(parsedData);
      setContadorDeTransacao(contador); 
      setTotalDeGastos(totalGastos);
      setTotalDeLucros(totalLucros);
      localStorage.setItem('parsedData', JSON.stringify(parsedData));
      localStorage.setItem('contador', contador); 
      localStorage.setItem('totalGastos', Math.floor(totalGastos));
      localStorage.setItem('totalLucros', Math.floor(totalLucros));
      
   /*    // Passar os totais de gastos e lucros de volta para grafico.jsx
      setTotalDeGastos(totalGastos);
      setTotalDeLucros(totalLucros); */
    },
  });
};

export default handleFileChange;
