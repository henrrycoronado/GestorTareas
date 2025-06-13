import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthService } from "../services/User/UserService";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const session = await AuthService.isLoggedIn();
      setIsAuthenticated(!!session);
      setLoading(false);
    }
    checkSession();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
