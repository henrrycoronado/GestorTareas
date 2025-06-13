import React, { useState } from "react";
import { UserService, AuthService } from "../services/User/UserService";
import { Link, useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return "Todos los campos deben ser completados.";
    }
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }
    return "correct";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (validation !== "correct") {
      return window.alert(validation);
    }
    const authResponse = await AuthService.SignUp(email, password);
    if (!authResponse) {
      return window.alert("Usuario registrado en la base de datos, pero no se pudo autenticar.");
    }
    const userSaved = await UserService.Add(firstName, lastName, email, password);
    if (!userSaved) {
      return window.alert("El usuario no se pudo registrar en la base de datos.");
    }
    window.alert("Registro exitoso. Ingresa a tu correo y verifica tu cuenta.");
    navigate("/");
  };

  return (
    <div className="dark:bg-gray-800 h-full w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-white text-2xl font-bold text-center">📝 Registro</h2>

        <div className="flex gap-3">
          <input
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
            type="text"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <input
          className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex gap-3">
          <input
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">
            Registrarse
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/signIn" className="text-blue-400 hover:underline font-medium">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
};
