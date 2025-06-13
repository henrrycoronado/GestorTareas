import React, { useEffect, useState } from "react";
import { AuthService } from "../services/User/UserService";
import logo from "../assets/logo-sf.png";

export const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const session = await AuthService.isLoggedIn();
      setIsAuthenticated(!!session);
    }
    checkSession();
  }, []);
  const handleSignOut = () => {
    AuthService.SignOut();
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {" | Task Manager"}
          </span>
        </a>
        {isAuthenticated ? (
          <div className="flex md:order-2 gap-5">
            <a href="/">
            <button>Home</button>
          </a>
          <a href="/dashboard">
            <button>Dashboard</button>
          </a>
          <a href="/profile">
            <button>Profile</button>
          </a>
          <button className="font-medium text-[#646cff] no-underline hover:text-[#f5f5f5]"
            onClick={handleSignOut} >LogOut</button>
      </div>
        ):(<div className="flex md:order-2 gap-5">
          <a href="/">
            <button>Home</button>
          </a>
          <a href="/signin">
            <button>SignIn</button>
          </a>
          <a href="/signup">
            <button>SignUp</button>
          </a>
      </div>)}
      </div>
    </nav>
  );
};