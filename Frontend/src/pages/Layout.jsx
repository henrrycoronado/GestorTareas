import React from 'react';
import { NavBar } from '../components/NavBar';
import { Footer }  from '../components/Footer';


export const Layout = ({ children }) => {
  return (
    <div className="dark:bg-gray-800 w-full h-full flex flex-col">
      <NavBar />
      <main className="flex-1 w-full h-max items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
