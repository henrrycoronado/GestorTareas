import React, { useEffect, useState } from 'react';
import { TaskService } from '../services/Task/TaskService';
import { CategoryService } from '../services/Category/CategoryService';
import { UserService } from '../services/User/UserService';

export const TaskManagerPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState(0);

    const fetchTasks = async () => {
        const data = await TaskService.GetTasks(userId);
        if (data) setTasks(data);
    };

    const fetchCategories = async () => {
        const data = await CategoryService.GetCategories(userId);
        if (data) setCategories(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !startDate || !endDate || !categoryId) return;
        const result = await TaskService.Add(title.toUpperCase(), startDate, endDate, userId, parseInt(categoryId), description);
        if (result) {
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setCategoryId('');
            await fetchTasks();
        } else {
            console.error("❌ Error al crear tarea");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedTask(null);
    };

    const handleUpdate = async () => {
        if (!title.trim() || !startDate || !endDate || !categoryId) return;
        const success = await TaskService.Update(
            selectedTask.id,
            title.toUpperCase(),
            description,
            startDate,
            endDate,
            selectedTask.complete,
            parseInt(categoryId)
        );
        if (success) {
            await fetchTasks();
            setIsEditing(false);
            setSelectedTask(null);
        } else {
            console.error("❌ Error al actualizar tarea");
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm(`¿Seguro que deseas eliminar la tarea "${selectedTask.title}"?`);
        if (!confirm) return;
        const success = await TaskService.Delete(selectedTask.id);
        if (success) {
            await fetchTasks();
            setSelectedTask(null);
        } else {
            console.error("❌ Error al eliminar tarea");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await UserService.GetPerson();
            if (!currentUser) {
                window.alert("No se detecta un perfil.");
                return;
            }
            setUserId(currentUser.id);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (userId > 0) {
            fetchTasks();
            fetchCategories();
        }
    }, [userId]);

    return (
        <div className="w-full h-max p-10 text-white bg-gray-900 shadow-lg items-center justify-center">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Formulario */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">📝 Gestión de Tareas</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required className="w-full p-2 bg-gray-800 rounded-md" />
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" className="w-full p-2 bg-gray-800 rounded-md" />
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full p-2 bg-gray-800 rounded-md" />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="w-full p-2 bg-gray-800 rounded-md" />
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full p-2 bg-gray-800 rounded-md">
                            <option value="">Selecciona categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                            ))}
                        </select>
                        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold">➕ Crear Tarea</button>
                    </form>

                    <h3 className="text-xl font-semibold mb-4">📋 Tareas</h3>
                    <ul className="space-y-2">
                        {tasks.map(task => (
                            <li key={task.id} onClick={() => { setSelectedTask(task); setIsEditing(false); setTitle(task.title); setDescription(task.description); setStartDate(task.start_date); setEndDate(task.end_date); setCategoryId(task.category_id); }} className={`cursor-pointer bg-gray-800 px-4 py-3 rounded-md hover:bg-gray-700 ${selectedTask?.id === task.id ? 'ring-2 ring-blue-500' : ''}`}>
                                <div className="flex justify-between">
                                    <span>{task.title}</span>
                                    <span className="text-xs text-gray-400">{task.start_date} → {task.end_date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Detalles de Tarea */}
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-semibold mb-4">🔍 Detalle de Tarea</h3>
                    {selectedTask ? (
                        <div className="space-y-3">
                            <p><span className="font-medium text-gray-300">ID:</span> {selectedTask.id}</p>
                            <p><span className="font-medium text-gray-300">Título:</span> {title}</p>
                            <p><span className="font-medium text-gray-300">Descripción:</span> {description}</p>
                            <p><span className="font-medium text-gray-300">Fechas:</span> {startDate} - {endDate}</p>
                            <p><span className="font-medium text-gray-300">Categoría:</span> {categories.find(c => c.id === parseInt(categoryId))?.category_name || 'Sin categoría'}</p>

                            <div className="flex gap-4 justify-center mt-6">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md">💾 Guardar</button>
                                        <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md">❌ Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEdit} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md">✏️ Editar</button>
                                        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md">🗑️ Eliminar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">Selecciona una tarea para ver los detalles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
