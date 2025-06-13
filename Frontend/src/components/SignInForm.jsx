import React, { useState } from "react";
import { AuthService } from "../services/User/UserService";
import { Link, useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      window.alert("Por favor, complete ambos campos.");
      return;
    }

    const result = await AuthService.SignIn(email, password);
    if (!result) {
      window.alert("Inicio de sesión fallido. Verifica tus credenciales.");
      return;
    }

    window.alert("Inicio de sesión exitoso.");
    window.location.href = "/dashboard";
  };

  return (
    <div className="dark:bg-gray-900 max-w-md mx-auto mt-28 p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-center text-white mb-6">🔐 Iniciar sesión</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Correo electrónico"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contraseña"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Iniciar sesión
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-400 text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
};
