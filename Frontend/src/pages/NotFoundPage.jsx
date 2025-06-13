import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="flex flex-col text-center text-white justify-center items-center w-full h-full">
    <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
    <p className="mb-6">Lo sentimos, la ruta que has intentado acceder no existe.</p>
    <Link to="/" className="text-blue-400 underline">Volver al inicio</Link>
  </div>
);
