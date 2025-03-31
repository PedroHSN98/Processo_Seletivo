import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detalhes from "./pages/Detalhes";
import Inclusao from "./pages/InclusaoDados";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="/inclusao/:id/:ocoId" element={<Inclusao />} />
      </Routes>
  );
}

export default App;
