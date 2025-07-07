import React, { useContext } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
export const StudentDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    // Aqui você faria chamadas para buscar notas e presenças do aluno
    // const { data: grades, isLoading: gradesLoading } = useGrades(user.id);

    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Bem-vinda, {user?.name}!</h1>
                        <p className="text-slate-500">Este é o seu painel de controlo académico.</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="px-4 py-2 font-semibold text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200"
                    >
                        Sair
                    </button>
                </header>
                <div className="space-y-8">
                    {/* Aqui entrariam os componentes de notas e presenças */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-slate-700">As minhas Notas</h2>
                        <p className="mt-4 text-slate-600">O componente `GradesTable` seria renderizado aqui.</p>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-slate-700">A minha Frequência</h2>
                        <p className="mt-4 text-slate-600">O componente `AttendanceChart` seria renderizado aqui.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
