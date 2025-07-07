import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para checar o estado inicial

  useEffect(() => {
    // Lógica para verificar se há um token no localStorage ao carregar a página
    // Aqui, vamos simular um usuário logado para teste.
    // Em um projeto real, você decodificaria o token JWT aqui.
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
        // Simulação: em um caso real, você faria uma chamada a /auth/profile
        setUser({ name: 'Usuário Teste', role: 'aluno' }); 
    }
    setLoading(false);
  }, []);

  // A função de login atualizaria o estado e o localStorage
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};