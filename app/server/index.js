import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

let arquivoCsv = [];

app.get("/api", (req, res) => {
  res.json(arquivoCsv);
});

app.post("/api", (req, res) => {
  const novoArquivoCsv = req.body;
  arquivoCsv.push(novoArquivoCsv);
  res.send({ message: "Teste" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
