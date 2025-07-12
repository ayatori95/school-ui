import apiClient from './api'; // Importa nossa instância configurada do Axios

export const classService = {
  /**
   * Busca as turmas associadas ao professor logado.
   * O token JWT é adicionado automaticamente pelo interceptor do apiClient.
   * @returns {Promise<Array>} Uma promessa que resolve para uma lista de turmas.
   */
  getTeacherClasses: async () => {
    try {
      const response = await apiClient.get('/classes/teacher/me');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar turmas do professor:", error);
      // Lança o erro para que o componente que chamou possa tratá-lo (ex: mostrar uma mensagem na tela)
      throw error;
    }
  },

  /**
   * Busca os alunos de uma turma específica pelo ID da turma.
   * @param {string} classId - O ID da turma.
   * @returns {Promise<Array>} Uma promessa que resolve para uma lista de alunos.
   */
  getStudentsByClass: async (classId) => {
    // Evita uma chamada de API desnecessária se nenhum ID for fornecido
    if (!classId) {
      return [];
    }
    
    try {
      const response = await apiClient.get(`/classes/${classId}/students`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar alunos da turma ${classId}:`, error);
      throw error;
    }
  },
};