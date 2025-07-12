import apiClient from './api'; // Importa nossa instância configurada do Axios

export const gradeService = {
  /**
   * Cria ou atualiza a nota de um aluno.
   * O backend (NestJS) usará o critério (studentId, subject, semester, year)
   * para decidir se deve criar um novo registro ou atualizar um existente (upsert).
   * @param {object} gradeData - Os dados da nota, correspondendo ao CreateGradeDto.
   * Ex: { studentId: '...', classId: '...', subject: 'Matemática', semester: 1, year: 2025, value: 8.5 }
   * @returns {Promise<object>} Uma promessa que resolve para o registro da nota criada/atualizada.
   */
  createOrUpdateGrade: async (gradeData) => {
    try {
      const response = await apiClient.post('/grades', gradeData);
      return response.data;
    } catch (error) {
      console.error("Erro ao lançar nota:", error.response?.data || error.message);
      // Lança o erro para que o componente possa exibir uma mensagem de falha.
      throw error;
    }
  },
  
  /**
   * Busca todas as notas de um aluno específico.
   * @param {string} studentId - O ID do aluno.
   * @returns {Promise<Array>} Uma promessa que resolve para a lista de notas do aluno.
   */
  getGradesByStudent: async (studentId) => {
    try {
      // Supondo que você tenha um endpoint GET /grades/student/:studentId no NestJS
      const response = await apiClient.get(`/grades/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar notas do aluno ${studentId}:`, error);
      throw error;
    }
  },
};
