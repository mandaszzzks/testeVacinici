// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Syringe, Settings, LogOut, Sun, Moon, UsersRound } from "lucide-react"; 
import '../../styles/Dashboard.css'; 

export default function Sidebar({ currentTheme, toggleTheme }) { 
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Syringe className="sidebar-logo-icon" />
        <h1 className="sidebar-logo-text">Vacinici</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              <BarChart3 size={18} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              <Users size={18} /> Usuários
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/vaccines"
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              <Syringe size={18} /> Vacinas
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/patients" // Link para a lista de pacientes
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              <UsersRound size={18} /> Pacientes 
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <Settings size={18} /> Configurações
        </NavLink>
        
        <button onClick={toggleTheme} className="nav-item theme-toggle-btn">
          {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span className="theme-toggle-text">{currentTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
        </button>

        <a href="#" onClick={() => alert('Funcionalidade de Sair a ser implementada!')} className="nav-item">
            <LogOut size={18} /> Sair
        </a>
      </div>
    </aside>
  );
}