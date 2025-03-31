import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDesaparecidos } from "../services/api"; // Função que você já tem para obter os dados

function Detalhes() {
  const [desaparecido, setDesaparecido] = useState(null);
  const { id } = useParams(); // Pega o ID da URL
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        const dados = await fetchDesaparecidos();
        if (Array.isArray(dados)) {
          const pessoa = dados.find((p) => p.id === Number(id));
          setDesaparecido(pessoa);
        } else if (dados?.content) {
          const pessoa = dados.content.find((p) => p.id === Number(id));
          setDesaparecido(pessoa);
        }

        // Se houver múltiplas ocorrências, pegar a mais recente
        if (desaparecido && Array.isArray(desperarecido?.ocorrencias)) {
          const ocorrenciasOrdenadas = [...desaparecido.ocorrencias].sort((a, b) => new Date(b.dtDesaparecimento) - new Date(a.dtDesaparecimento));
          setDesaparecido((prevState) => ({
            ...prevState,
            ultimaOcorrencia: ocorrenciasOrdenadas[0], // A mais recente
          }));
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os detalhes:", error);
        setLoading(false);
      }
    };

    carregarDetalhes();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleVoltar = () => {
    console.log("Logout realizado!");
    navigate("/home");
  };

  const handleAtualizar = () => {
    // Navega para a página de atualização com o id do desaparecido e o id da ocorrência
    navigate(`/inclusao/${desaparecido.id}/${desaparecido.ultimaOcorrencia?.ocoId}`);
  };

  const cardColor = desaparecido?.vivo ? "bg-green-200" : "bg-red-200";

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Detalhes do Desaparecido</h1>

      {desaparecido ? (
        <div className={`shadow-md rounded-lg p-4 ${cardColor}`}>
          <button
            onClick={handleVoltar}
            className="mb-4 text-white bg-blue-500 px-4 py-2 rounded-md"
          >
            Voltar
          </button>

          {/* Exibindo a foto */}
          <img
            src={desaparecido.urlFoto || "https://via.placeholder.com/150"}
            alt={desaparecido.nome}
            className="w-full h-40 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-2">{desaparecido.nome}</h2>
          <p className="text-gray-600">Idade: {desaparecido.idade || "Não informada"}</p>
          <p className="text-gray-600">Sexo: {desaparecido.sexo}</p>
          <p className="text-gray-600">Status: {desaparecido.vivo ? "Localizado" : "Desaparecido"}</p>

          {/* Detalhes sobre o desaparecimento */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Último local e Ocorrência</h3>
            <p className="text-gray-600">Local do desaparecimento: {desaparecido.ultimaOcorrencia?.localDesaparecimentoConcat || "Desconhecido"}</p>
            <p className="text-gray-600">Data do desaparecimento: {new Date(desaparecido.ultimaOcorrencia?.dtDesaparecimento).toLocaleDateString() || "Desconhecida"}</p>
            <p className="text-gray-600">Vestimentas: {desaparecido.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || "Não informado"}</p>
            <p className="text-gray-600">Ocorrência ID: {desaparecido.ultimaOcorrencia?.ocoId || "Não informada"}</p>
          </div>

          {/* Informações adicionais (se disponíveis) */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Outras Informações</h3>
            <p className="text-gray-600">Local de localização: {desaparecido.ultimaOcorrencia?.dataLocalizacao || "Não localizada"}</p>
          </div>

          {/* Botão para editar/atualizar dados */}
          <button
            onClick={handleAtualizar}
            className="mt-4 text-white bg-yellow-500 px-4 py-2 rounded-md"
          >
            Atualizar Dados
          </button>
        </div>
      ) : (
        <p>Desaparecido não encontrado.</p>
      )}
    </div>
  );
}

export default Detalhes;
