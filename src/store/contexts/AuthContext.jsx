import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from './authService'; // Ajuste o caminho

// Cria o contexto
export const AuthContext = createContext(null);

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
    return useContext(AuthContext);
}
// Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Essencial para a verificação inicial
  const [error, setError] = useState(null);

  // Este useEffect roda uma vez quando a aplicação carrega
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Se tem token, tenta buscar o perfil para validar a sessão
          const profileData = await authService.getProfile();
          setUser(profileData);
        } catch (err) {
          // Se o token for inválido, limpa o localStorage
          console.error("Sessão inválida ou expirada.", err);
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
      // Finaliza o estado de carregamento inicial
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      // 1. Pega o token da API
      const response = await authService.login(email, password);
      const token = response.access_token;
      
      // 2. Armazena o token no localStorage
      localStorage.setItem('authToken', token);

      // 3. Busca os dados do perfil com o novo token
      const profileData = await authService.getProfile();
      
      // 4. Atualiza o estado do usuário
      setUser(profileData);

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Credenciais inválidas. Por favor, tente novamente.");
      // Garante que o estado de usuário e o token sejam limpos em caso de falha
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // Não precisa de navigate aqui, o ProtectedRoute cuidará do redirecionamento
  };

  // O valor que será compartilhado com todos os componentes filhos
  const value = {
    user,
    loading,
    error,
    login,
    logout,
  };

  /* Não renderiza nada enquanto o estado de `loading` inicial for verdadeiro.
    Isso evita um "flash" da página de login antes do usuário ser verificado.
  */
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};