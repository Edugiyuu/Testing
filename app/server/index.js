import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; 

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: '*'
}));

/* app.use(bodyParser.json()); */

app.get("/api", (req, res) => {
  res.json({
    Data: '',
    Valor: '',
    Descrição: ''
  });
  
});

app.post("/api", (req, res) => {
  const data = req.body; 
  console.log(data);
  res.json({ message: "Teste" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
