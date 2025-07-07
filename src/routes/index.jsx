import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App'; // Nosso Layout Principal
import LoginPage from '../pages/LoginPage';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import HomeRedirect from './HomeRedirect';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O App.jsx agora funciona como um layout que contém o <Outlet />
    errorElement: <NotFoundPage />, // Página para rotas não encontradas
    children: [
        { 
            index: true, // Rota raiz (ex: http://localhost:3000/)
            element: <HomeRedirect /> // Componente que redireciona baseado no perfil
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        // --- Rotas Protegidas ---
        {
            element: <ProtectedRoute />, // Envolve as rotas que precisam de login
            children: [
                {
                    path: 'aluno/dashboard',
                    element: <StudentDashboard />,
                },
                {
                    path: 'professor/dashboard',
                    element: <TeacherDashboard />,
                },
                // Adicione outras rotas protegidas aqui
            ]
        },
         // --- Rotas Protegidas com Roles Específicas (Alternativa) ---
        {
            path: 'aluno',
            element: <ProtectedRoute allowedRoles={['aluno']} />,
            children: [
                { path: 'dashboard', element: <StudentDashboard /> }
            ]
        },
        {
            path: 'professor',
            element: <ProtectedRoute allowedRoles={['professor']} />,
            children: [
                { path: 'dashboard', element: <TeacherDashboard /> }
            ]
        }
    ],
  },
]);