const XLSX = require("xlsx");

const arquivo = XLSX.readFile("./ArquivosNãoFeitos/arquivoNaoFeito.csv", {/*  type: 'string', */ codepage: 65001 });

const primeiraPlanilha = arquivo.Sheets[arquivo.SheetNames[0]];

const dados = XLSX.utils.sheet_to_json(primeiraPlanilha);

var gastos = 0;
var colunaDeGastos = [];
var colunaDeRecebidos = [];
var colunaDeTipoDeGastos = [];
var colunaDeTipoDeRecebidos = [];
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
const Gastos = arquivo.Sheets["Gastos"];
const Recebidos = arquivo.Sheets["Recebidos"];


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

XLSX.writeFile(arquivo, "./ArquivosFeitos/arquivoFeito.xlsx");

//console.log(dados); 

