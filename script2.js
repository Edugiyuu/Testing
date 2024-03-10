const XLSX = require("xlsx");

const arquivo = XLSX.readFile("./ArquivosNãoFeitos/arquivoNaoFeito.csv", {/*  type: 'string', */ codepage: 65001 });

const primeiraPlanilha = arquivo.Sheets[arquivo.SheetNames[0]];

const dados = XLSX.utils.sheet_to_json(primeiraPlanilha);

var gastos = 0;
var colunaDeGastos = [];
var colunaDeTipoDeGastos = [];
//const descricao = dados[i]["Descrição"];

for (let i = 0; i < dados.length; i++) {
    if (dados[i].Valor < 0) {
        gastos += dados[i].Valor;
        colunaDeGastos.push([`R$ ${dados[i].Valor}`]);
    }
    /* if (dados[i]['Descrição'].includes('Transferência enviada pelo Pix')) {
        colunaDeTipoDeGastos.push([`R$ ${dados[i]['Descrição']}`]);
    } */
}


colunaDeGastos.unshift(["Gastos"]);
console.log(colunaDeTipoDeGastos);
console.log(colunaDeGastos);

var ColunaDeGastosPraPlanilha = XLSX.utils.aoa_to_sheet(colunaDeGastos);
var ColunaDeTipoGastosPraPlanilha = XLSX.utils.aoa_to_sheet(colunaDeTipoDeGastos);

// Criar um novo arquivo XLSX
/* const novoArquivo = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(novoArquivo, primeiraPlanilha, "Planilha 1");
 */
// Escrever o novo arquivo XLSX


 XLSX.utils.book_append_sheet(arquivo, ColunaDeGastosPraPlanilha, "Planilha");
XLSX.writeFile(arquivo, "./ArquivosFeitos/arquivoFeito.xlsx");

console.log(dados); 
