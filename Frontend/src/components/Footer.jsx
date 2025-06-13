import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white shadow-sm dark:bg-gray-800 w-full p-6">
      <div className="container mx-auto px-4 py-3 md:py-4 md:flex md:items-center justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 block w-full md:w-auto">
          © 2025 <a href="/" className="hover:underline">Task Manager</a>. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
