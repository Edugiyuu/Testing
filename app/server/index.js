import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

//Esse arquivoCsv é o que tem vai ser enviado para a api, se mudar qualquer coisa nessa variavel vai pra lá
// ----------------------------------- GET -----------------------------------------------
let arquivoCsv = [];
let Dados = {
  'Nome':'',
  'Email': '',
  'Categoria':''
};

app.get("/api/arquivos", (req, res) => {
  // aqui ele só está transformando em json
  res.json(arquivoCsv);
});
app.get('/api/arquivos/:id', (req, res) => {
    const id = req.params.id;
    // Lógica para encontrar e retornar o arquivo com o id fornecido
});
app.get("/api/dadosDoUsuario", (req, res) => {
  // aqui ele só está transformando em json
  res.json(Dados);
});

//------------------------- POST ------------------------------
app.post("/api/arquivos", (req, res) => {
  // esse req.body pelo oq eu entendi é o que eu estou passando lá no metodo POST no handleFile.jsx no body
  const novoArquivoCsv = req.body;
  //aqui ele pega o arquivoCsv da api e vai colocando o novo arquivo do cliente
  arquivoCsv.push(novoArquivoCsv);
  //aqui só é uma mensagem pra testar
  res.send({ message: "Novo Arquivo" });
});
app.post("/api/dadosDoUsuario", (req, res) => {
  //req.body pelo oq eu entendi é o que eu estou passando lá no metodo POST
  Dados.Nome = req.body.Nome;
  Dados.Email = req.body.Email;
  Dados.Categoria = req.body.Categoria;
  res.send({ message: "Dados do usuario atualizados" });
});

//----------------------- DELETE ---------------------------
app.delete('/api/arquivos', (req, res) => { 
  arquivoCsv = [];
  res.send({ message: "Deletado" });
}) 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

