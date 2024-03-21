/* const fs = require("fs");
const XLSX = require("xlsx");
var csv = require('jquery-csv');

//const arquivo = XLSX.readFile("Pasta1.xlsx")
const worksheet = arquivo.Sheets['Planilha1']

const arr = XLSX.utils.sheet_to_json(worksheet)
console.log(arr); 


  const arquivo = XLSX.readFile("ExtratoBancário.xlsx");


  const primeiraPlanilha = arquivo.Sheets[arquivo.SheetNames[0]];
  const dados = XLSX.utils.sheet_to_json(primeiraPlanilha);

  console.log(dados);

  const novaCelula = 'C20';
  var totalPayments = 0
  var totalBankCharge = 0
  var totalCashReceipt = 0
  primeiraPlanilha[novaCelula] = { v: totalPayments };
  
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].concept === 'payments') {
      totalPayments += dados[i].valor
    }else if (dados[i].concept === 'bank charge') {
      totalBankCharge += dados[i].valor
    }else if (dados[i].concept === 'cash receipt') {
      totalCashReceipt += dados[i].valor
    }
    
  }
  const planilhaTotal = XLSX.utils.aoa_to_sheet(
    [["Total de Pagamentos","bank charge","cash receipt"],
     [`R$ ${totalPayments},00`,`R$ ${totalBankCharge},00`,`R$ ${totalCashReceipt},00`]

    ]);
  XLSX.utils.book_append_sheet(arquivo, planilhaTotal, "Total");
  XLSX.writeFile(arquivo, "ExtratoBancárioNovo.xlsx");
  console.log(totalPayments);
  console.log(totalBankCharge); */
  const Papa = require('papaparse');


const test = 'Coluna111,Edu,HELO';

console.log(Papa.parse(test));

const valores = ['-1210.00', '-109.90', '-10.00', '-30.00', '-130.00', '-5.00', '-50.00', '-640.35', '-20.00', '-30.00', '-327.06', '-54.77', '-4382.69', '-400.00', '-636.59', '-73.72', '-1000.00', '-500.00', '-132.00', '-14500.00', '-10000.00', '-21.07', '-245.00', '-80.00', '-43.50', '-372.71', '-100.00', '-150.00', '-31.53', '-117.06', '-149.97', '-47.92', '-40.00', '-100.00', '-20.00', '-17.00', '-169.56', '-35.00', '-45.00', '-300.00', '-29.00'];

const arrayDeObjetos = valores.map(valor => ({ valor: parseFloat(valor) }));

console.log(arrayDeObjetos);
