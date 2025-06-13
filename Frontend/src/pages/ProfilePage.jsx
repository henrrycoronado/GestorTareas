import React, { useEffect, useState } from "react";
import { AuthService, UserService } from "../services/User/UserService";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await AuthService.GetUser();
      if (!currentUser) {
        window.alert("Debes iniciar sesión para ver tu perfil.");
        navigate("/signin");
        return;
      }
      setUser(currentUser);
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    AuthService.SignOut();
  };

  return (
    <div className="dark:bg-gray-900 max-w-md mx-auto mt-28 p-8 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-center text-white mb-6">👤 Perfil de usuario</h2>
      {user ? (
        <div className="space-y-4 text-white">
          <div>
            <p className="text-gray-400">Correo electrónico:</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">ID de usuario:</p>
            <p className="font-mono break-all text-sm">{user.id}</p>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center">Cargando perfil...</p>
      )}
    </div>
  );
};
