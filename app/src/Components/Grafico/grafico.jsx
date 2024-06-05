import React, { useState, useEffect, useContext } from "react";
import Papa from "papaparse";
import generatePDF, { Margin } from "react-to-pdf";
import { UserContext } from "../../Hooks/UserContext";
import handleFileChange from "../../HandleFile";
import "../Grafico/Grafico.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Rectangle,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  Pie,
  RadialBarChart,
  RadialBar,
} from "recharts";

const personalizacao = {
  // Baixar/Salvar = save / Abrir no navegador = open
  method: "open",
  page: {
    // Definir a margem: SMALL ou MEDIUM
    margin: Margin.MEDIUM,
    // Formato da página: A4 ou letter
    format: "A4",
    // Orientação do arquivo: portrait ou landscape
    orientation: "portrait",
  },
};

const Grafico = () => {
  const { saldo, nome, totalPositivo, totalNegativo, totalFinal, arquivoCsv } =
    useContext(UserContext);

  console.log(arquivoCsv);
  const [arrayDeObjetosGastos, setArrayDeObjetosGastos] = useState([]);
  const [arrayDeTodosOsNumeros, setArrayDeTodosOsNumeros] = useState([]);
  const [totalDeGastos, setTotalDeGastos] = useState(0);
  const [totalDeLucros, setTotalDeLucros] = useState(0);
  const [totalUltimo, setTotalFinal] = useState(0);
  const [mesDeGastos, setMesDeGastos] = useState(0);
  const [mesesComMaisGastos, setMesesComMaisGastos] = useState([]);
  const [mesDeLucros, setMesDeLucros] = useState(0);

  useEffect(() => {
    const numeroMenor = [];
    let totalMenor = 0;
    const numeroMaior = [];
    const todosOsNumeros = [];
    let totalMaior = 0;
    var mesComMaisLucro = "";
    var maiorValor = 0;
    var mesComMaisGasto = "";
    var mesesComMaisGastos = [];
    var menorValor = 0;

    for (let i = 0; i < arquivoCsv.length; i++) {
      if (arquivoCsv[i].Valor < 0) {
        totalMenor += +arquivoCsv[i].Valor;
        numeroMenor.push(arquivoCsv[i].Valor);
        todosOsNumeros.push(arquivoCsv[i].Valor);

        if (arquivoCsv[i].Valor < menorValor) {
          menorValor = Number(arquivoCsv[i].Valor);
          mesComMaisGasto = arquivoCsv[i].Data;
          var diaMesAno = arquivoCsv[i].Data.split("/");

          mesesComMaisGastos.push(diaMesAno[1]);

          console.log(mesesComMaisGastos);
        }
      } else {
        totalMaior += +arquivoCsv[i].Valor;
        numeroMaior.push(arquivoCsv[i].Valor);
        todosOsNumeros.push(arquivoCsv[i].Valor);

        if (arquivoCsv[i].Valor > maiorValor) {
          maiorValor = Number(arquivoCsv[i].Valor);
          mesComMaisLucro = arquivoCsv[i].Data;
        }
      }
    }
    console.log();
    setMesDeGastos(mesComMaisGasto);
    setMesDeLucros(mesComMaisLucro);

    setTotalDeGastos(totalMenor);
    setTotalDeLucros(totalMaior);

    const arrayDeNumerosDeObjetosTotais = todosOsNumeros.map((total) => ({
      total: parseFloat(total),
    }));
    setArrayDeTodosOsNumeros(arrayDeNumerosDeObjetosTotais);

    const arrayDeObjetosNegativos = numeroMenor.map((gasto) => ({
      gasto: parseFloat(gasto),
    }));
    setArrayDeObjetosGastos(arrayDeObjetosNegativos);
  }, [arquivoCsv]);

  useEffect(() => {
    setTotalFinal(totalDeGastos + totalDeLucros);
  }, [totalDeGastos || totalDeLucros]);

  const [valorColocado, setValorColocado] = useState(0);

  const valorEstimado = (event) => {
    const valorDigitado = event.target.value;
    setValorColocado(valorDigitado);
  };

  const recuperarConteudoParaPDF = () => {
    const conteudoElement = document.getElementById("conteudo");

    return conteudoElement;
  };

  localStorage.setItem("SaldoDepois", Math.floor(Number(saldo) + totalUltimo));
  const data = [
    { name: "Total Gasto", value: Math.abs(totalDeGastos), fill: "#cc2020" },
    { name: "Total Esperado", value: valorColocado, fill: "#8b33ff" },
    { name: "Total De Lucro", value: totalDeLucros, fill: "#48e421" },
    { name: "Total Final", value: Math.floor(totalUltimo), fill: "#d2fd12" },
    { name: "Saldo", value: Math.floor(saldo), fill: "#00c3ff" },
  ];

  const gradientOffset = () => {
    const dataMax = Math.max(...arrayDeTodosOsNumeros.map((i) => i.total));
    const dataMin = Math.min(...arrayDeTodosOsNumeros.map((i) => i.total));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  const BarStyle = {
    width: "90%",
    height: "100%",
  };

  return (
    <div>
      <input
        type="number"
        name="valorEstimado"
        onChange={valorEstimado}
        placeholder="Coloque um valor que você predendia gastar.."
      />

      {/* <LineChart width={1100} height={500} data={parsedData} margin={{top:30,right: 9, bottom: 5, left: 100 }}>
    <Line type="monotone" dataKey="ano" stroke="#2196F3" strokeWidth={3} />
    <Line width={500} type="monotone"dataKey='Valor'stroke="#F44236"strokeWidth={3} />
    <Line type="monotone" dataKey="test" stroke="#FFCA29" strokeWidth={3} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
  </LineChart> */}
      {/*--------------------------------------------- */}

      <div id="conteudo" className="TodosOsGraficos">
        {/* <div className='Mês'>
     <p>Mês/Dia Com mais Lucros: {mesesComMaisGastos}</p>
     <p>Mês/Dia Com mais Gastos: {mesDeGastos}</p>
    </div> */}

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Gastos Totais", "Creditos Totais", "Total", "Meta"],
            },
          ]}
          series={[
            {
              data: [
                `${totalNegativo}`,
                totalPositivo,
                totalFinal,
                valorColocado,
              ],
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 20, additionalRadius: -20, color: "gray" },
            },
          ]}
          yAxis={[
            {
              colorMap: {
                type: "piecewise",
                thresholds: [0],
                colors: ["#e41212df", "#4fbe0e"],
              },
            },
          ]}
          layout="vertical"
          barLabel="value"
          borderRadius={8}
          width={900}
          height={400}
        />
        <PieChart
          series={[
            {
              data: [
                //o abs troca o valor negativo pra positivo, e o positivo pro negativo#3f0ecc
                {
                  id: 0,
                  value: Math.abs(totalFinal),
                  label: "Total",
                  color: "#3f0ecc",
                },
                {
                  id: 1,
                  value: Math.abs(totalNegativo),
                  label: "Gastos Totais",
                  color: "#d30f0fe0",
                },
                {
                  id: 2,
                  value: totalPositivo,
                  label: "Créditos Totais",
                  color: "#49b40c",
                },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 3,
              cornerRadius: 3,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 20, additionalRadius: -20, color: "gray" },
            },
          ]}
          width={480}
          height={200}
        />
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          yAxis={[
            {
              colorMap: {
                type: "piecewise",
                thresholds: [0, 10],
                colors: ["red", "green", "blue"],
              },
            },
          ]}
          series={[
            {
              data: [2, 5.5, -2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />

        <AreaChart
          className="segundoGrafico"
          data={arrayDeTodosOsNumeros}
          width={1100}
          height={500}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#4fe708" /* stopOpacity={1}  */ />
              <stop offset={off} stopColor="#e20b0b" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="total"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </div>

      <button
        onClick={() => generatePDF(recuperarConteudoParaPDF, personalizacao)}
      >
        Gerar PDF
      </button>
    </div>
  );
};

export default Grafico;
