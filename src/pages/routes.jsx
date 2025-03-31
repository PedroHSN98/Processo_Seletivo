import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Detalhes = lazy(() => import("./pages/Detalhe"));
const Inclusao = lazy(() => import("./pages/InclusaoDados"));

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:id" element={<Detalhes />} />
          <Route path="/inclusao/:id/:ocoId" element={<Inclusao />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
