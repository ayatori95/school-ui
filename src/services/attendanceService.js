import apiClient from './api';

export const attendanceService = {
  /**
   * Cria os registros de presença para múltiplos alunos em uma data específica.
   * @param {object} attendanceData - Os dados de presença, correspondendo ao CreateAttendanceDto.
   * Ex: { classId: '...', date: '2025-07-11', students: [{ studentId: '...', status: 'presente' }] }
   * @returns {Promise<object>} Uma promessa que resolve para a mensagem de sucesso da API.
   */
  createAttendance: async (attendanceData) => {
    try {
      const response = await apiClient.post('/attendances', attendanceData);
      return response.data;
    } catch (error) {
      console.error("Erro ao lançar presença:", error.response?.data || error.message);
      throw error;
    }
  },
  
  /**
   * Busca os registros de presença de um aluno para um mês/ano específico.
   * @param {string} studentId - O ID do aluno.
   * @param {number} month - O mês (1-12).
   * @param {number} year - O ano.
   * @returns {Promise<Array>} Uma promessa que resolve para a lista de registros de presença.
   */
  getAttendanceByStudent: async (studentId, month, year) => {
    try {
      // O backend espera os parâmetros como query string: /attendances?studentId=...&month=...&year=...
      const response = await apiClient.get('/attendances', {
        params: {
          studentId,
          month,
          year,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar presença do aluno ${studentId}:`, error);
      throw error;
    }
  },
};