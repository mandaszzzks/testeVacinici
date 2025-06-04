// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// Ajuste o caminho se o Dashboard.css estiver em src/styles/
import '../../styles/Dashboard.css'; // Ou '../styles/Dashboard.css' 

export default function DashboardLayout() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Define 'light' como padrão se nada estiver salvo e o OS não preferir dark
    return savedTheme || (prefersDark ? 'dark' : 'light'); 
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light'); // Garante que só uma classe de tema esteja ativa
    } else {
      document.documentElement.classList.add('light'); // Adiciona 'light' explicitamente
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar currentTheme={theme} toggleTheme={toggleTheme} />
      {/* O Outlet agora renderiza diretamente dentro de dashboard-main-content */}
      <main className="dashboard-main-content"> 
        <Outlet />
      </main>
    </div>
  );
}