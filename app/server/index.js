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
let arquivoCsv = [];

app.get("/api", (req, res) => {
  // aqui ele só está transformando em json
  res.json(arquivoCsv);
});

app.post("/api", (req, res) => {
  // esse req.body pelo oq eu entendi é o que eu estou passando lá no metodo POST no handleFile.jsx no body
  const novoArquivoCsv = req.body;
  //aqui ele pega o arquivoCsv da api e vai colocando o novo arquivo do cliente
  arquivoCsv.push(novoArquivoCsv);
  //aqui só é uma mensagem pra testar
  res.send({ message: "Teste" });
});

app.delete('/api', (req, res) => { 
  arquivoCsv = [];
  res.send("Deletado") 
}) 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
