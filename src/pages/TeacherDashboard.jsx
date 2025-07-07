import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
export const TeacherDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simulação: buscar as turmas do professor ao carregar o componente
    React.useEffect(() => {
        // Em um caso real: const data = await classesService.getForTeacher(user.id);
        const mockClasses = [
            { id: 'class1', name: '3º Ano A - Ensino Médio' },
            { id: 'class2', name: '2º Ano B - Ensino Médio' },
        ];
        setClasses(mockClasses);
    }, [user]);

    // Simulação: buscar os alunos da turma selecionada
    const handleClassChange = async (classId) => {
        setSelectedClass(classId);
        if (!classId) {
            setStudents([]);
            return;
        }
        setLoading(true);
        // Em um caso real: const data = await studentsService.getByClass(classId);
        const mockStudents = {
            class1: [{ id: 's1', name: 'Mariana Costa' }, { id: 's2', name: 'João Pedro' }],
            class2: [{ id: 's3', name: 'Beatriz Lima' }, { id: 's4', name: 'Lucas Martins' }],
        };
        setTimeout(() => { // Simula a latência da rede
            setStudents(mockStudents[classId] || []);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Bem-vindo, Professor {user?.name}!</h1>
                        <p className="text-slate-500">Selecione uma turma para gerir notas e presenças.</p>
                    </div>
                     <button 
                        onClick={logout}
                        className="px-4 py-2 font-semibold text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200"
                    >
                        Sair
                    </button>
                </header>
                
                {/* Seletor de Turma */}
                <div className="mb-8">
                    <select
                        value={selectedClass}
                        onChange={(e) => handleClassChange(e.target.value)}
                        className="w-full max-w-xs p-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="">-- Selecione uma Turma --</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {/* Área de Gestão da Turma */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    {loading && <p>A carregar alunos...</p>}
                    {!loading && !selectedClass && <p className="text-slate-500">Por favor, selecione uma turma para começar.</p>}
                    {!loading && selectedClass && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-700 mb-4">Alunos da Turma</h2>
                            {students.length > 0 ? (
                                <ul className="space-y-2">
                                    {students.map(student => (
                                        <li key={student.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center">
                                            <span>{student.name}</span>
                                            <div className="space-x-2">
                                                <button className="text-sm text-indigo-600 hover:underline">Ver Notas</button>
                                                <button className="text-sm text-emerald-600 hover:underline">Lançar Presença</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>Nenhum aluno encontrado para esta turma.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};