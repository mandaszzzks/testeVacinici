// App.jsx

import React from "react";
import { BrowserRouter, Route, Routes, Navigate, NavLink } from 'react-router-dom';

// Componentes
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Politica from "./components/Politica/Politica";
import Login from "./components/Login/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import UserFormPage from "./pages/UserFormPage";
import UserDetailPage from "./pages/UserDetailPage";
import VaccineControlPage from "./pages/VaccineControlPage";
import VaccineFormPage from "./pages/VaccineFormPage";
import VaccineDetailPage from "./pages/VaccineDetailPage";
import SettingsPage from "./pages/SettingsPage";
import PatientListPage from "./pages/PatientListPage";
import PatientFormPage from "./pages/PatientFormPage";
import PatientDetailPage from "./pages/PatientDetailPage"; // NOSSA NOVA PÁGINA DE DETALHES DO PACIENTE

const PublicLayout = ({ children }) => ( <div><Navbar />{children}<Footer /></div> );
const Inicial = () => ( <div><Navbar /><Home /><Footer /></div> );

function App() {
  const isAuthenticated = true; 

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path='/' element={<Inicial />} />
        <Route path='/politica' element={<PublicLayout><Politica /></PublicLayout>} />
        <Route path='/bottom' element={<Inicial />} /> 
        <Route path='/entrar' element={<Login />} />

        {/* Rotas da Área Administrativa / Dashboard */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/entrar" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} /> 
          <Route path="dashboard" element={<DashboardPage />} />
          
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/new" element={<UserFormPage />} />
          <Route path="users/edit/:userId" element={<UserFormPage />} /> 
          <Route path="users/detail/:userId" element={<UserDetailPage />} />
          
          <Route path="vaccines" element={<VaccineControlPage />} />
          <Route path="vaccines/new" element={<VaccineFormPage />} />
          <Route path="vaccines/edit/:vaccineId" element={<VaccineFormPage />} /> 
          <Route path="vaccines/detail/:vaccineId" element={<VaccineDetailPage />} />

          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/new" element={<PatientFormPage />} />
          <Route path="patients/edit/:patientId" element={<PatientFormPage />} />
          {/* NOVA ROTA PARA DETALHES DO PACIENTE: */}
          <Route path="patients/detail/:patientId" element={<PatientDetailPage />} />
          
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        <Route path='/Enter' element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="*" element={
          <PublicLayout>
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h1>404 - Página Não Encontrada</h1>
              <p>Desculpe, a página que você está procurando não existe.</p>
              <NavLink to="/">Voltar para a Home</NavLink>
            </div>
          </PublicLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;