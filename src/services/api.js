import axios from 'axios';

// Crie uma instância do Axios com a URL base da sua API NestJS.
// É uma boa prática carregar esta URL de um arquivo .env
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

/*
  Este é o "pulo do gato": um interceptor que adiciona automaticamente
  o token de autenticação em TODAS as requisições para a API,
  exceto as que não precisam (como o próprio login).
*/
apiClient.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');

    // Se o token existir, adiciona ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export default apiClient;
