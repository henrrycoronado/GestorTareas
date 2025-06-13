import React from "react";

export const HomePage = () => {

  return (
    <div className="h-full text-white bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        👋 Bienvenido a Task Manager
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Organiza tus tareas, gestiona tu tiempo y alcanza tus objetivos de forma eficiente. 
        Esta plataforma te ayuda a mantenerte enfocado y productivo.
      </p>
      <div className="flex gap-4">
        <a href="/Dashboard">
          <button><h2>Empecemos!!</h2></button>
        </a>
      </div>
    </div>
  );
};
