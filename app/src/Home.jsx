import { useState, createContext, useContext } from "react";
import { UserContext} from "./UserContext";

export const Home = () => {
  const contex = useContext(UserContext)
  console.log(contex);
  const [valorDoSaldo, setValorDoSaldo] = useState(1);

  const valorEstimado = (event) => {
    const valorDigitado = event.target.value;
    setValorDoSaldo(Number(valorDigitado)); 
  }

  const SalvarSaldo = () => {
    console.log(valorDoSaldo);
  }
  
  return (
    <div>
      <h1>{contex.usuario}</h1>
      <input
        type='number'
        name="valorEstimado"
        onChange={valorEstimado}
        placeholder='Coloque um valor que você pretende gastar..'
      />
      <button onClick={SalvarSaldo}>
        Save
      </button>
      
    </div>
  );
};

export default Home;