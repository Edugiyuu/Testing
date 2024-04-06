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
  const Data = '12/01/2022'
  const Data2 = ['12/03/2022','12/01/2022','22/07/2022','03/04/2022','11/02/2022']
  const reverse = Data.split('').reverse().join('');
  console.log(reverse); // "olleh"