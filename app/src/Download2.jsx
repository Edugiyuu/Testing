import generatePDF, { Margin } from 'react-to-pdf';
import { CartesianGrid,Legend, Line,LineChart,Tooltip,XAxis, YAxis, BarChart,Bar,Rectangle ,ResponsiveContainer, ReferenceLine,AreaChart,Area,PieChart,Pie, RadialBarChart,RadialBar} from "recharts";


const personalizacao = {
  // Baixar/Salvar = save / Abrir no navegador = open
  method: 'open',
  page: {
    // Definir a margem: SMALL ou MEDIUM 
    margin: Margin.MEDIUM,
    // Formato da página: A4 ou letter
    format: 'A4',
    // Orientação do arquivo: portrait ou landscape
    orientation: 'portrait',
  },
}

const recuperarConteudoParaPDF = () => document.getElementById('conteudo');
const dataInfo =[{ 
  name: "Total de Gastos", total: 22,
  name: "Total de Lucro",total2: 33,
  name: "Total Es",total3: 33,
  name: "Total Final",total4: 1,
  }]
 function Download2() {
  return (
    <>
      <main>
        <button onClick={() => generatePDF(recuperarConteudoParaPDF, personalizacao)}>Gerar PDF</button>

        <div id="conteudo" >
        <BarChart className='primeiroGrafico'width={1100} height={500} margin={{right: 9, bottom: 0, left: 100 ,top: 10}} data={dataInfo} barGap={15}>
      <Legend stroke='#add8e6'/>
        <XAxis dataKey='name2' />
        <YAxis stroke="#000000"/>
        <Tooltip />
        <CartesianGrid stroke="#add8e6" />
        <Bar name='Total De Gastos'dataKey="total" barSize={35} fill="#ca0404" baseProfile={9} />
        <Bar name='Total De Lucros'dataKey="total2" barSize={35} fill="#43ca04" />
        <Bar name='Total Pretendido'dataKey="total3" barSize={35} fill="#570d9c"  />
        <Bar name='Total Final'dataKey="total4" barSize={35} fill="#d8d51f" />
      </BarChart>
        </div>

      </main>
    </>
  )
}


export default Download2;
