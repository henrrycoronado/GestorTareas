import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

export const ListObject = () => {
    const navigate = useNavigate();
    const { object, filter } = useParams();

    // Simulación de 5 elementos relacionados con el `object` y `filter`
    const items = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Elemento ${i + 1} de ${object}`,
        description: `Filtrado por: ${filter}`,
    }));

    return (
        <div className="bg-gray-900 rounded-lg shadow-xl w-full h-max px-6 py-6 space-y-6">
            <h2 className="text-white text-xl font-bold mb-4">📂 Lista de {object}</h2>
            <p className="text-gray-400 mb-6">🔍 Filtro aplicado: <strong>{filter}</strong></p>

            {items.map(item => (
                <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition-colors"
                >
                    <div>
                        <h4 className="text-base font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/detail/${object}/${item.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-xl"
                        aria-label={`Ver detalle de ${item.title}`}
                    >
                        ➡️
                    </button>
                </div>
            ))}
        </div>
    );
};
