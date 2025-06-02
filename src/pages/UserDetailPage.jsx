// src/pages/UserDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, UserCircle, Mail, ShieldCheck, Phone, CalendarClock, CheckSquare, XSquare, AlertCircle } from 'lucide-react';

// Dados de exemplo (idealmente viriam de um contexto, Redux, ou seriam buscados por uma API)
// Para este exemplo, vamos copiar os dados aqui. Em um app real, você buscaria pelo userId.
const usersData = [
  { id: 'usr_001', name: 'Ana Beatriz Costa', email: 'anabeatriz.costa@example.com', role: 'Administrador', lastActive: '01 Jun, 2025 - 14:30', dateAdded: '15 Jan, 2025', avatar: 'https://via.placeholder.com/100/A0D2DB/3A3D3A?text=AB', phone: '(11) 98765-4321', status: 'Ativo' },
  { id: 'usr_002', name: 'Carlos Eduardo Lima', email: 'carlos.lima@example.com', role: 'Enfermeiro(a)', lastActive: '30 Mai, 2025 - 09:15', dateAdded: '02 Fev, 2025', avatar: 'https://via.placeholder.com/100/F4B393/3A3D3A?text=CL', phone: '(21) 91234-5678', status: 'Ativo' },
  { id: 'usr_003', name: 'Mariana Silva Oliveira', email: 'mariana.oliveira@example.com', role: 'Recepcionista', lastActive: '01 Jun, 2025 - 10:05', dateAdded: '10 Mar, 2025', avatar: 'https://via.placeholder.com/100/C7CEEA/3A3D3A?text=MS', phone: '(31) 99999-8888', status: 'Inativo' },
];

// Componente para exibir um item de detalhe (reutilizado da VaccineDetailPage, mas pode ser global)
const DetailItem = ({ icon, label, value, className = '' }) => (
  <div className={`detail-item ${className}`}>
    {icon && React.cloneElement(icon, { size: 18, className: 'detail-item-icon' })}
    <div className="detail-item-content">
      <span className="detail-item-label">{label}</span>
      <span className="detail-item-value">{value || 'Não informado'}</span>
    </div>
  </div>
);

export default function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundUser = usersData.find(u => u.id === userId);
    setTimeout(() => { // Simula delay de API
      setUser(foundUser);
      setLoading(false);
    }, 300);
  }, [userId]);

  if (loading) {
    return <div className="loading-state">Carregando detalhes do usuário...</div>;
  }

  if (!user) {
    return (
      <div className="not-found-state">
        <AlertCircle size={48} className="not-found-icon" />
        <h2>Usuário não encontrado</h2>
        <p>O usuário com o ID "{userId}" não foi encontrado no sistema.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>
          <ArrowLeft size={18} /> Voltar para Lista de Usuários
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title page-detail-title">
            <UserCircle size={30} className="title-icon" /> Detalhes do Usuário
          </h2>
          {/* <p className="content-subtitle">Informações completas sobre o usuário selecionado.</p> */}
        </div>
        <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>
                <ArrowLeft size={18} /> Voltar para Lista
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/admin/users/edit/${user.id}`)}>
                <Edit size={18} /> Editar Usuário
            </button>
        </div>
      </header>

      <section className="user-detail-content">
        <div className="detail-card user-profile-card">
          <div className="user-profile-header">
            <img src={user.avatar} alt={`Avatar de ${user.name}`} className="user-detail-avatar" />
            <div className="user-profile-info">
              <h1 className="user-detail-name">{user.name}</h1>
              <p className="user-detail-email">
                <Mail size={14} /> {user.email}
              </p>
              <p className="user-detail-phone">
                <Phone size={14} /> {user.phone || 'Telefone não informado'}
              </p>
            </div>
          </div>
           <div className="user-profile-status">
              <span className={`badge badge-user-status-${user.status.toLowerCase()}`}>
                {user.status === 'Ativo' ? <CheckSquare size={14}/> : <XSquare size={14}/> }
                {user.status}
              </span>
           </div>
        </div>

        <div className="detail-card">
          <h3 className="detail-section-title">Informações de Acesso e Atividade</h3>
          <div className="detail-grid">
            <DetailItem 
              icon={<ShieldCheck />} 
              label="Função / Nível de Acesso" 
              value={
                <span className={`badge badge-role-${user.role.toLowerCase().replace('(', '').replace(')', '')}`}>
                  {user.role}
                </span>
              } 
            />
            <DetailItem icon={<CalendarClock />} label="Último Acesso" value={user.lastActive} />
            <DetailItem icon={<CalendarClock strokeWidth={2.5}/>} label="Data de Adição" value={user.dateAdded} />
          </div>
        </div>
        
        {/* Seção futura para permissões detalhadas ou log de atividades */}
        {/* <div className="detail-card">
          <h3 className="detail-section-title">Permissões Detalhadas</h3>
          <div className="detail-grid detail-grid-single-col">
             Exibir lista de permissões específicas 
          </div>
        </div>
        <div className="detail-card">
          <h3 className="detail-section-title">Log de Atividades Recentes</h3>
          <div className="detail-grid detail-grid-single-col">
             Exibir um mini log de atividades do usuário 
          </div>
        </div>
        */}
      </section>
    </>
  );
}