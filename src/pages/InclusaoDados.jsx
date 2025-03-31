import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function InclusaoDados() {
  const { id, ocoId } = useParams(); // Pega os IDs da URL
  const navigate = useNavigate(); // Para navegar para outra página
  const [formData, setFormData] = useState({
    informacao: '',
    descricao: '',
    data: '',
    ocoId: ocoId, // Usar o ocoId da URL diretamente
    imagens: []
  });
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagens') {
      const imagensArray = Array.from(files);
      setFormData((prevState) => ({
        ...prevState,
        imagens: imagensArray
      }));

      const previewsArray = imagensArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewsArray);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('informacao', formData.informacao);
    data.append('descricao', formData.descricao);
    data.append('data', formData.data);
    data.append('ocoId', Number(formData.ocoId)); // Convertendo para número
    formData.imagens.forEach((imagem) => {
      data.append('imagens', imagem); // Garantindo que cada imagem seja anexada corretamente
    });

    try {
      const response = await axios.post(
        'https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Dados enviados com sucesso:', response.data);

      // Exibir um alert com as informações enviadas
      alert(`Dados enviados com sucesso:
      Informações: ${formData.informacao}
      Descrição: ${formData.descricao}
      Data: ${formData.data}
      ID da Ocorrência: ${formData.ocoId}
      Imagens enviadas: ${formData.imagens.length} imagens`);

      // Após a atualização, redireciona para a página de detalhes do desaparecido
      handleDetalhes(id); // Passa o id do desaparecido
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleDetalhes = async (id) => {
    try {
      // Realiza a pesquisa na API para obter os dados do desaparecido
      const response = await axios.get(`https://abitus-api.geia.vip/v1/pessoas/${id}`);
      const data = response.data;

      // Verificar se os dados estão corretos
      if (data && data.id) {
        // Se os dados estiverem corretos, navegar para a página de detalhes com o ID
        navigate(`/detalhes/${data.id}`);
      } else {
        console.error("Dados inválidos retornados da API.");
      }
    } catch (error) {
      console.error("Erro ao carregar os dados do desaparecido:", error);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Inclusão de Dados</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Informação:</label>
          <textarea
            name="informacao"
            value={formData.informacao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Descrição:</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Data da Visualização:</label>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">ID da Ocorrência (ocoId):</label>
          <input
            type="number"
            name="ocoId"
            value={formData.ocoId} // Usando o valor diretamente de formData
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Imagens:</label>
          <input
            type="file"
            name="imagens"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="mt-2 flex flex-wrap">
            {previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Pré-visualização ${index + 1}`}
                className="w-24 h-24 object-cover m-1 rounded"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default InclusaoDados;
