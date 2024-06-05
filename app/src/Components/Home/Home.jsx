import React, { useState, useContext } from "react";
import { UserContext } from "../../Hooks/UserContext";
import { PieChart } from "@mui/x-charts/PieChart";
import { NavLink } from 'react-router-dom';

import "../Home/Home.css";
export const Home = () => {
  const { saldo, nome, totalPositivo, totalNegativo, totalFinal, arquivoCsv } = useContext(UserContext);
  /*  window.location.reload(true); */
  console.log(arquivoCsv);
  const dadosDoCSV = arquivoCsv.map((item) => ({
    id: item.Categoria,
    value: item.id, // Converte para número
    label: item.Categoria,
  }));
  return (
    <div className="TudoHome">
      <h1>Bem-vindo {nome}!</h1>
      <div className="InfoGeral">
        <div className="InfoTotal">
          <p>Total</p>
          <h2>R$ {totalFinal}</h2>
        </div>
        
        <div className="InfoGastos">
          <p>Gastos Totais</p>
          <h2>R$ {totalNegativo}</h2>
        </div>
        <div className="InfoCreditos">
          <p>Creditos Totais</p>
          <h2>R$ {totalPositivo}</h2>
        </div>

        <div className="Teste">
          <h3>Sua Conta</h3>
          <div className="InfoSaldo">
            <p>Saldo</p>
            <div>
              {/* <h4>Transações: {localStorage.getItem('contador')}</h4>
              <h4>Saldo Inicial: R$ {saldo}</h4> */}
            </div>
          </div>
          
        </div>
        <div className="graficoDePizza">
          
          <PieChart
          
            series={[
              {
                data: [
                  //o abs troca o valor negativo pra positivo, e o positivo pro negativo#3f0ecc
                  { id: 0, value: Math.abs(totalFinal), label: "Total", color:"#3f0ecc"},
                  {id: 1,value: Math.abs(totalNegativo), label: "Gastos Totais", color:"#d30f0fe0"},
                  { id: 2, value: totalPositivo, label: "Créditos Totais", color:"#49b40c"},
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 3,
                cornerRadius: 3,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
              },
            ]}
            width={480}
            height={200}
          />
          <div style={{ marginRight:'85px'}}>
            <NavLink className='VerMais' to={`/grafico/`}>Ver mais</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
