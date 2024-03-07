 const fs = require("fs");
const XLSX = require("xlsx");
/* 
const arquivo = XLSX.readFile("Pasta1.xlsx")
const worksheet = arquivo.Sheets['Planilha1']

const arr = XLSX.utils.sheet_to_json(worksheet)
console.log(arr); */


  const workbook = XLSX.readFile("ExtratoBancário.xlsx");

  console.log("Planilhas encontradas:", workbook.SheetNames);

 
  const primeiraPlanilha = workbook.Sheets[workbook.SheetNames[0]];
  const dados = XLSX.utils.sheet_to_json(primeiraPlanilha);
  console.log( dados);
  var total = 0
  
  for (let i = 0; i < dados.length; i++) {
    total += dados[i].valor
    
  }

  console.log(total);