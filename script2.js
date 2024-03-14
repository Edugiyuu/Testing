const XLSX = require("xlsx");
var prompt = require('prompt-sync')();
const fs = require('fs')
var colors = require('colors/safe');
const cfonts = require('cfonts');
cfonts.say('Csv to xlsx', {
	font: 'simple',              // define the font face
	align: 'left',              // define text alignment
    colors: ['system'],       // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	letterSpacing: 3,           // define letter spacing
	lineHeight: 1,              // define the line height
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: ['#20A4F3', '#81E979'],
	independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment cfonts is being executed in
});
/* 
console.log('Nome do do seu arquivo csv:');
var arquivoCsv = prompt("")

try{
    var arquivo = XLSX.readFile(`./ArquivosNãoFeitos/${arquivoCsv}.csv`, {codepage: 65001 });
}catch (error) {
    console.log('Atenção: Coloque seu arquivo csv na Pasta "ArquivosNãoFeitos"\nE execute novamente');
    return
} */


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


var colunaDeNomesGastos = [];
var colunaDeTipoDeGastos = [];
var colunaDoBancoGastos = [];
var colunaDosDadosBancoGastos = [];
//---------------------------
var colunaDeNomesRecebidos = [];
var colunaDeTipoDeRecebidos = []


for (let i = 0; i < dados.length; i++) {

    if (dados[i].Valor < 0) {
        gastos += dados[i].Valor;
        var descricaoParts = dados[i]['Descrição'].split(' - ');
        const nomeDoBanco = descricaoParts[3]
        const dadosDoBanco = descricaoParts[2]
        const nomeDaPessoa = descricaoParts[1]
        const TipoDeGasto = descricaoParts[0]

        colunaDeGastos.push([`R$ ${dados[i].Valor}`]);
        colunaDeTipoDeGastos.push([TipoDeGasto]);
        colunaDeNomesGastos.push([nomeDaPessoa]);
        colunaDoBancoGastos.push([nomeDoBanco]);
        colunaDosDadosBancoGastos.push([dadosDoBanco])


    } else {
        entradas += dados[i].Valor;
        const descricaoParts = dados[i]['Descrição'].split(' - ');
        const nomeDaPessoa = descricaoParts[1]
        const TipoDeRecebimento = descricaoParts[0]
        colunaDeRecebidos.push([`R$ ${dados[i].Valor}`]);
        colunaDeTipoDeRecebidos.push([TipoDeRecebimento]);
        colunaDeNomesRecebidos.push([nomeDaPessoa]);
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
    { wch: 25 },   // terceira coluna
    { wch: 20 },
    { wch: 20 },
];

// ------------Gastos---------------------
Gastos['!cols'] = wscols;

colunaDeGastos.unshift(["Gastos"]);
colunaDeTipoDeGastos.unshift(["Tipos de gastos"]);
colunaDeNomesGastos.unshift(["Nomes"]);
colunaDosDadosBancoGastos.unshift(['Dados Do Banco'])
colunaDoBancoGastos.unshift(["Banco"]);
XLSX.utils.sheet_add_aoa(Gastos, colunaDeGastos, { origin: "A1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDeTipoDeGastos, { origin: "B1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDeNomesGastos, { origin: "C1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDosDadosBancoGastos, { origin: "D1" });
XLSX.utils.sheet_add_aoa(Gastos, colunaDoBancoGastos, { origin: "E1" });

//-------------Recebimentos-------------------
 Recebidos['!cols'] = wscols;

colunaDeRecebidos.unshift(["Recebidos"]);
colunaDeTipoDeRecebidos.unshift(["Tipos de Recebimentos"]);
colunaDeNomesRecebidos.unshift(["Nomes"]);
XLSX.utils.sheet_add_aoa(Recebidos, colunaDeRecebidos, { origin: "A1" });
XLSX.utils.sheet_add_aoa(Recebidos, colunaDeTipoDeRecebidos, { origin: "B1" }); 
XLSX.utils.sheet_add_aoa(Recebidos, colunaDeNomesRecebidos, { origin: "C1" });


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

 var colunasTotais = [['Gastos Totais','Entradas','Lucro/Prejuizo','Gastos planejados']]
XLSX.utils.sheet_add_aoa(Total, colunasTotais, { origin: "A1" }, );

XLSX.utils.sheet_add_aoa(Total, [[`R$ ${Math.floor(gastos)}`]], { origin: "A2" });
XLSX.utils.sheet_add_aoa(Total, [[`R$ ${Math.floor(entradas)}`]], { origin: "B2" });
XLSX.utils.sheet_add_aoa(Total, [[`R$ ${Math.floor(lucroOuPrejuizo)}`]], { origin: "C2" });
XLSX.utils.sheet_add_aoa(Total, [[`R$ ${Math.floor(GastosPlanejados)}`]], { origin: "D2" });

XLSX.writeFile(arquivo, "./ArquivosFeitos/arquivoFeito.xlsx"); 




//console.log(dados); 

