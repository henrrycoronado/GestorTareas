import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskManagerPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = { title, description, date };

        try {
            // Aquí iría tu lógica para guardar en Supabase o backend
            // Ejemplo: await supabase.from('tasks').insert([newTask]);

            console.log("Tarea creada:", newTask);

            // Redireccionar luego de guardar
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-900 p-8 rounded-lg shadow-md text-white">
            <h2 className="text-2xl font-bold mb-6">➕ Crear Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">Fecha</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold transition-colors"
                >
                    Crear Tarea
                </button>
            </form>
        </div>
    );
};
