import React, { useEffect, useState } from "react";
import { fetchDesaparecidos } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [desaparecidos, setDesaparecidos] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true); // Estado de loading
  const itensPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true); // Inicia o loading
        const dados = await fetchDesaparecidos();
        if (Array.isArray(dados)) {
          setDesaparecidos(dados);
          setDadosFiltrados(dados);
          setTotalPaginas(Math.ceil(dados.length / itensPorPagina));
        } else if (dados?.content) {
          setDesaparecidos(dados.content);
          setDadosFiltrados(dados.content);
          setTotalPaginas(Math.ceil(dados.content.length / itensPorPagina));
        } else {
          console.error("Os dados retornados não são um array", dados);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };
    carregarDados();
  }, []);

  const handlePesquisa = (e) => {
    setPesquisa(e.target.value);
    const dadosFiltrados = desaparecidos.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDadosFiltrados(dadosFiltrados);
    setPaginaAtual(1);
  };

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const dadosPagina = dadosFiltrados.slice(indexInicial, indexFinal);

  const handleLogout = () => {
    console.log("Logout realizado!");
    navigate("/");
  };

  // Alterado para usar o id do desaparecido
  const handleDetalhes = (id) => {
    navigate(`/detalhes/${id}`); // Usando o ID do desaparecido, não o ocoId
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Desaparecidos</h1>

      {/* Barra de Pesquisa */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={pesquisa}
          onChange={handlePesquisa}
          className="px-4 py-2 w-full sm:w-1/3 border rounded-md"
        />
      </div>

      {/* Botão de Logout */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-xl">Carregando...</span>
        </div>
      ) : (
        <>
          {/* Cards de Desaparecidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dadosPagina.map((pessoa) => (
              <div
                key={pessoa.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                onClick={() => handleDetalhes(pessoa.id)} // Usando pessoa.id aqui
              >
                <img
                  src={pessoa.urlFoto || "https://via.placeholder.com/150"}
                  alt={pessoa.nome}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{pessoa.nome}</h2>
                <p className="text-gray-600">Idade: {pessoa.idade || "Não informada"}</p>
                <p className="text-gray-600">Sexo: {pessoa.sexo}</p>
                <p className="text-gray-600">Último local: {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || "Desconhecido"}</p>
                <p className="text-gray-600">Ocorrência ID: {pessoa.ultimaOcorrencia?.ocoId || "Não informado"}</p>
                <p className="text-gray-600">Data do Desaparecimento: {new Date(pessoa.ultimaOcorrencia?.dtDesaparecimento).toLocaleDateString() || "Desconhecida"}</p>
                <p className="text-gray-600">Vestimentas: {pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || "Não informado"}</p>
                <p className="text-gray-600">Status: {pessoa.vivo ? "Localizado" : "Desaparecido"}</p>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              onClick={() => setPaginaAtual(1)}
              disabled={paginaAtual === 1}
            >
              Primeira Página
            </button>

            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>

            <span className="text-lg font-semibold">
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              onClick={() => setPaginaAtual(totalPaginas)}
              disabled={paginaAtual === totalPaginas}
            >
              Última Página
            </button>

            {/* Selecionar página específica */}
            <input
              type="number"
              min="1"
              max={totalPaginas}
              value={paginaAtual}
              onChange={(e) => {
                let pagina = Number(e.target.value);
                if (pagina >= 1 && pagina <= totalPaginas) {
                  setPaginaAtual(pagina);
                }
              }}
              className="w-16 text-center border rounded-md px-2"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
