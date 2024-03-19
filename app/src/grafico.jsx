
import React, { useState } from 'react';
import Papa from "papaparse";
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis} from "recharts";


 const Grafico = () => {
    /* const data = [
        { ano: "2017", primeiroNumero: 32, segundoNumero: 37, },
        { ano: "2018", primeiroNumero: 42, segundoNumero: 42},
        { ano: "2019", primeiroNumero: 51, segundoNumero: 41},
        { ano: "2020", primeiroNumero: 60, segundoNumero: 37},
        { ano: "2021", primeiroNumero: 51, segundoNumero: 31},
        { ano: "2022", primeiroNumero: 95, segundoNumero: 44},
      ]; */
    const data = [
        { primeiroNumero: 32, segundoNumero: 37, },
        { primeiroNumero: 42, segundoNumero: 42},
        { primeiroNumero: 51, segundoNumero: 41},
        { primeiroNumero: 60, segundoNumero: 37},
        {  primeiroNumero: 51, segundoNumero: 31},
        {  primeiroNumero: 95, segundoNumero: 44},
      ];
  return (
    
    <LineChart width={1200} height={300} data={data}>
    <Line type="monotone" dataKey="ano" stroke="#2196F3" strokeWidth={3} />
    <Line type="monotone"dataKey="primeiroNumero"stroke="#F44236"strokeWidth={3}
    />
    <Line type="monotone" dataKey="segundoNumero" stroke="#FFCA29" strokeWidth={3} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
  </LineChart>
  );
};

export default Grafico;

 