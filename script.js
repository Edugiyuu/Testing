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
  console.log("Dados da primeira planilha:", dados[0]);