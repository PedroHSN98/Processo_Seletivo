import axios from 'axios';

const API_URL = "https://abitus-api.geia.vip/v1/pessoas/aberto?pagina=0&porPagina=1000&direcao=DESC&status=DESAPARECIDO";

export const fetchDesaparecidos = async () => {
  try {
    const response = await axios.get(API_URL);
    // Verifica se a resposta tem os dados de desaparecidos
    if (response.status === 200 && response.data) {
      return response.data; // Retorna os dados completos da API
    } else {
      throw new Error("Formato inesperado de resposta da API.");
    }
  } catch (error) {
    console.error("Erro ao buscar desaparecidos:", error);
    throw error;
  }
};
