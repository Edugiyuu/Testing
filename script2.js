const XLSX = require("xlsx");
var prompt = require('prompt-sync')();
const fs = require('fs')
var colors = require('colors/safe');

console.log('Quanto você planejava gastar?');
var GastosPlanejados = prompt(0)
if (isNaN(Number(GastosPlanejados))) {
    console.log('isso não é um numero.. Tente denovo');
    GastosPlanejados = prompt(0)
}

const arquivo = XLSX.readFile("./ArquivosNãoFeitos/arquivoNaoFeito.csv", {codepage: 65001 });

const primeiraPlanilha = arquivo.Sheets[arquivo.SheetNames[0]];

const dados = XLSX.utils.sheet_to_json(primeiraPlanilha);

var gastos = 0;
var entradas = 0;
var colunaDeGastos = [];
var colunaDeRecebidos = [];
var colunaDeTipoDeGastos = [];
var colunaDeTipoDeRecebidos = []
var colunaDeNomes = [];


for (let i = 0; i < dados.length; i++) {

    if (dados[i].Valor < 0) {

        gastos += dados[i].Valor;
        const descricaoParts = dados[i]['Descrição'].split(' - ');
        const nomeDaPessoa = descricaoParts[1]
        const TipoDeGasto = descricaoParts[0]

        colunaDeGastos.push([`R$ ${dados[i].Valor}`]);
        colunaDeTipoDeGastos.push([TipoDeGasto]);
        colunaDeNomes.push([nomeDaPessoa]);


    } else {
        entradas += dados[i].Valor;
        const descricaoParts = dados[i]['Descrição'].split(' - ');
        const TipoDeRecebimento = descricaoParts[0]
        colunaDeRecebidos.push([`R$ ${dados[i].Valor}`]);
        colunaDeTipoDeRecebidos.push([TipoDeRecebimento]);
    }

}

/* for (let i = 0; i < dados.length; i++) {
    
    colunaDeGastos.push([`R$ ${dados[i].Valor}`]);
} */


/* console.log(colunaDeGastos);
console.log(colunaDeRecebidos); */


XLSX.utils.book_append_sheet(arquivo, {}, "Recebidos");
XLSX.utils.book_append_sheet(arquivo, {}, "Gastos");
XLSX.utils.book_append_sheet(arquivo, {}, "Total");
const Gastos = arquivo.Sheets["Gastos"];
const Recebidos = arquivo.Sheets["Recebidos"];
const Total = arquivo.Sheets["Total"];


/*  XLSX.utils.sheet_add_json(novaPlanilha, [
    { "Gastos": [colunaDeGastos], "valor1": '' },[colunaDeGastos],{ "Coluna1": [1], "Valor2": null }
  ], { origin: "A1" });  */


const wscols = [
    { wch: 13 }, // primeira coluna 
    { wch: 30 }, // segunda coluna 
    { wch: 20 }   // terceira coluna
];

// ------------Gastos---------------------
Gastos['!cols'] = wscols;

colunaDeGastos.unshift(["Gastos"]);
colunaDeTipoDeGastos.unshift(["Tipos de gastos"]);
colunaDeNomes.unshift(["Nomes"]);
XLSX.utils.sheet_add_aoa(Gastos, colunaDeGastos, { origin: "A1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDeTipoDeGastos, { origin: "B1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDeNomes, { origin: "C1" });

//-------------Recebimentos-------------------
 Recebidos['!cols'] = wscols;

colunaDeRecebidos.unshift(["Recebidos"]);
colunaDeTipoDeRecebidos.unshift(["Tipos de Recebimentos"]);
XLSX.utils.sheet_add_aoa(Recebidos, colunaDeRecebidos, { origin: "A1" });
XLSX.utils.sheet_add_aoa(Recebidos, colunaDeTipoDeRecebidos, { origin: "B1" }); 


//------------------------------------------------

const wscolsTotal = [
    { wch: 15 }, // primeira coluna 
    { wch: 15 }, // segunda coluna 
    { wch: 15 },
    { wch: 15 }   
];
Total['!cols'] = wscolsTotal;
//var comparação = Number(GastosPlanejados) + gastos;
var lucroOuPrejuizo = entradas + gastos;

/* const planilhaTotal = XLSX.utils.aoa_to_sheet(
    [['Gastos planejados','Gastos Reais','comparação'],
     [`R$ ${GastosPlanejados},00`,`R$ ${gastos},00`,`R$ ${comparação},00`]

    ]);
    XLSX.utils.book_append_sheet(arquivo, planilhaTotal, "Total"); */

 var colunasTotais = [['Gastos planejados','Gastos Reais','Entradas','Lucro/Prejuizo']]
XLSX.utils.sheet_add_aoa(Total, colunasTotais, { origin: "A1" }, );
XLSX.utils.sheet_add_aoa(Total, [[Math.floor(GastosPlanejados)]], { origin: "A2" });
XLSX.utils.sheet_add_aoa(Total, [[Math.floor(gastos)]], { origin: "B2" });
XLSX.utils.sheet_add_aoa(Total, [[Math.floor(entradas)]], { origin: "C2" });
XLSX.utils.sheet_add_aoa(Total, [[Math.floor(lucroOuPrejuizo)]], { origin: "D2" });

XLSX.writeFile(arquivo, "./ArquivosFeitos/arquivoFeito.xlsx"); 




//console.log(dados); 

