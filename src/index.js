import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom'; // Importe o RouterProvider
import { router } from './routes'; // Importe nosso objeto de rotas
import { AuthProvider } from './store/contexts/AuthContext'; // Importe o provedor de autenticação

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* O AuthProvider deve envolver o RouterProvider para que as rotas tenham acesso ao contexto */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
