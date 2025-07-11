import apiClient from './api';

export const authService = {
  /**
   * Envia as credenciais para o endpoint de login.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<{access_token: string}>} O token de acesso.
   */
  login: async (email, password) => {
    // O backend espera um campo 'pass', conforme nosso LoginDto no NestJS
    const response = await apiClient.post('/auth/login', { email, pass: password });
    return response.data;
  },

  /**
   * Busca os dados do perfil do usuário logado usando o token.
   * Busca os dados do perfil do usuário logado usando o token.
   * O token é adicionado automaticamente pelo interceptor do Axios.
   * @returns {Promise<object>} Os dados do usuário.
   */
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
};