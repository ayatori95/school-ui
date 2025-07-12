import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600 mt-2">Página não encontrada.</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;