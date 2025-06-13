import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { TaskService } from '../services/Task/TaskService';
import { UserService } from "../services/User/UserService";
import { CategoryService } from '../services/Category/CategoryService';
export const ListTask = () => {
    const { date } = useParams();
    const [items, setItems] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [user, setUser] = useState({ id: 0, email: "" });
    const [categories, setCategories] = useState([]);

    const [completeFilter, setCompleteFilter] = useState("all");
    const [orderByFilter, setOrderByFilter] = useState("ninguno");
    
    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await UserService.GetPerson();
            if (!currentUser) {
                window.alert("No se detecta un perfil.");
            } else {
                setUser(currentUser);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (date && user.id !== 0) {
                const resp = await CategoryService.GetCategories(user.id);
                if (resp) {
                    setCategories(resp);
                }
                const [year, monthStr, dayStr] = date.split("-");
                const yearNum = parseInt(year);
                const monthNum = parseInt(monthStr) - 1;
                const dayNum = parseInt(dayStr);

                let completeParam;
                if (completeFilter === "all") completeParam = null;
                else if (completeFilter === "true") completeParam = true;
                else if (completeFilter === "false") completeParam = false;

                const result = await TaskService.GetTodayTasks(
                    user.id,
                    yearNum,
                    monthNum,
                    dayNum,
                    completeParam,
                    orderByFilter
                );
                if (result) {
                    setItems(result);
                    setSelectedTask(null);
                }
            }
        };
        fetchData();
    }, [date, user, completeFilter, orderByFilter]);

    return (
        <div className="bg-gray-900 rounded-lg shadow-xl w-full h-max px-6 py-6 space-y-6">
            <h2 className="text-white text-xl font-bold mb-4">📂 Lista de tasks</h2>
            <p className="text-gray-400 mb-2">Fecha: <strong>{date}</strong></p>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-gray-300">
                <div>
                    <label className="block mb-1">Estado:</label>
                    <select
                        value={completeFilter}
                        onChange={(e) => setCompleteFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-600 rounded-md px-2 py-1"
                    >
                        <option value="all">Todos</option>
                        <option value="true">Completados ✅</option>
                        <option value="false">Incompletos ❌</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Ordenar por:</label>
                    <select
                        value={orderByFilter}
                        onChange={(e) => setOrderByFilter(e.target.value)}
                        className="bg-gray-800 border border-gray-600 rounded-md px-2 py-1"
                    >
                        <option value="ninguno">Ninguno</option>
                        <option value="end_date">Fecha de fin</option>
                        <option value="create_date">Fecha de creación</option>
                        <option value="category">Categoría</option>
                        <option value="incomplete">Completitud</option>
                    </select>
                </div>
            </div>

            {/* Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lista */}
                <div className="space-y-4">
                    {items.length === 0 ? (
                        <p className="text-gray-500">No hay tareas para esta fecha y filtros.</p>
                    ) : (
                        items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedTask(item)}
                                className={`cursor-pointer flex items-center justify-between bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition-colors ${
                                    selectedTask?.id === item.id ? 'border border-blue-500' : ''
                                }`}
                            >
                                <div>
                                    <h4 className="text-base font-semibold">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                                <span className="text-blue-400">👁️</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Detalle */}
                <div className="bg-gray-800 rounded-md p-4 text-white min-h-[200px]">
                    {selectedTask ? (
                        <>
                            <h3 className="text-xl font-bold mb-2">📋 Detalle de Tarea</h3>
                            <p><strong>Título:</strong> {selectedTask.title}</p>
                            <p><strong>Descripción:</strong> {selectedTask.description}</p>
                            <p><strong>Inicio:</strong> {new Date(selectedTask.start_date).toLocaleString()}</p>
                            <p><strong>Fin:</strong> {new Date(selectedTask.end_date).toLocaleString()}</p>
                            <p><strong>Categoría:</strong> {categories.find(cat => cat.id === selectedTask.category_id)?.category_name}</p>
                            <p><strong>Completado:</strong> {selectedTask.complete ? "Sí" : "No"}</p>
                        </>
                    ) : (
                        <p className="text-gray-400">Selecciona una tarea para ver los detalles.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
