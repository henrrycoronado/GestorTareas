import React, { useEffect, useState } from 'react';
import { CategoryService } from '../services/Category/CategoryService';
import { UserService } from '../services/User/UserService';
import { useNavigate } from 'react-router-dom';

export const CategoryManagerPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState(0);

    const fetchCategories = async () => {
        const data = await CategoryService.GetCategories(userId);
        if (data) setCategories(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;
        const result = await CategoryService.Add(categoryName.toUpperCase(), userId);
        if (result) {
            setCategoryName('');
            await fetchCategories();
        } else {
            console.error("❌ Error al crear categoría");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditCategoryName(selectedCategory.category_name);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditCategoryName('');
    };

    const handleUpdate = async () => {
        if (!editCategoryName.trim()) return;
        const success = await CategoryService.Update(selectedCategory.id, editCategoryName.toUpperCase());
        if (success) {
            await fetchCategories();
            setSelectedCategory({ ...selectedCategory, category_name: editCategoryName });
            setIsEditing(false);
        } else {
            console.error("❌ Error al actualizar categoría");
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm(`¿Seguro que deseas eliminar la categoría "${selectedCategory.category_name}"?`);
        if (!confirm) return;
        const success = await CategoryService.Delete(selectedCategory.id);
        if (success) {
            await fetchCategories();
            setSelectedCategory(null);
            setIsEditing(false);
        } else {
            console.error("❌ Error al eliminar categoría");
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
            fetchCategories();
        }
    }, [userId]);    

    return (
        <div className="w-full h-max p-10 text-white bg-gray-900 shadow-lg items-center justify-center">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Columna izquierda */}
            <div>
                <h2 className="text-2xl font-bold mb-6">📂 Gestión de Categorías</h2>

                <form onSubmit={handleSubmit} className="space-y-5 mb-10">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Nombre de la Categoría</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Ej: Finanzas, Salud, Trabajo..."
                            className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold transition-colors"
                    >
                        ➕ Crear Categoría
                    </button>
                </form>

                <h3 className="text-xl font-semibold mb-4">📋 Categorías Existentes</h3>
                {categories.length > 0 ? (
                    <ul className="space-y-2">
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setIsEditing(false);
                                }}
                                className={`cursor-pointer bg-gray-800 px-4 py-3 rounded-md flex justify-between items-center hover:bg-gray-700 ${
                                    selectedCategory?.id === cat.id ? 'ring-2 ring-blue-500' : ''
                                }`}
                            >
                                <span>{cat.category_name}</span>
                                <span className="text-xs text-gray-400">ID: {cat.id}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">No tienes categorías creadas.</p>
                )}
            </div>

            {/* Columna derecha */}
            <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-4">📝 Detalle de Categoría</h3>
                {selectedCategory ? (
                    <div className="space-y-4 justify-center">
                        <p>
                            <span className="font-medium text-gray-300">ID:</span> {selectedCategory.id}
                        </p>
                        <div>
                            <span className="font-medium text-gray-300">Nombre:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    className="mt-1 p-2 w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
                                />
                            ) : (
                                <span>{selectedCategory.category_name}</span>
                            )}
                        </div>

                        <div className="flex gap-4 mt-6 justify-center">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white font-semibold"
                                    >
                                        💾 Guardar
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white font-semibold"
                                    >
                                        ❌ Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md text-white font-semibold"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-white font-semibold"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">Selecciona una categoría de la lista para ver sus detalles.</p>
                )}
            </div>
        </div>
        </div>
    );
};
