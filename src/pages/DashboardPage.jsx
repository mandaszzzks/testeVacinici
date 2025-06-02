// src/pages/DashboardPage.jsx
import React from 'react';
import { BarChart3, Users, Syringe, BellPlus, PlusCircle } from "lucide-react";
// Não precisa importar Dashboard.css aqui se DashboardLayout já o faz.

const dashboardStatsData = [
  { title: "Vacinas Aplicadas Hoje", value: "1.287", change: "+12.5%", Icon: Syringe, iconColor: "text-green-500", description: "Comparado ao dia anterior" },
  { title: "Novos Pacientes", value: "42", change: "+5.2%", Icon: Users, iconColor: "text-blue-500", description: "Últimas 24 horas" },
  { title: "Alertas Pendentes", value: "15", change: "-2.0%", Icon: BellPlus, iconColor: "text-yellow-500", description: "Para hoje" },
  { title: "Cobertura Vacinal (Mês)", value: "85%", change: "+0.5%", Icon: BarChart3, iconColor: "text-purple-500", description: "Este mês" },
];

const recentActivityData = [
  { id: 1, activity: "Vacina da Gripe aplicada em João Silva", time: "2 min atrás", type: "Vacinação" },
  { id: 2, activity: "Nova paciente Maria Oliveira cadastrada", time: "15 min atrás", type: "Cadastro" },
  { id: 3, activity: "Lembrete de vacina BCG enviado para Ana Costa", time: "1 hora atrás", type: "Alerta" },
  { id: 4, activity: "Estoque de vacina Pfizer atualizado", time: "3 horas atrás", type: "Estoque" },
  { id: 5, activity: "Relatório mensal de cobertura gerado", time: "5 horas atrás", type: "Relatório"},
];

function StatCard({ title, value, change, Icon, iconColor, description }) {
  const isPositiveChange = change && change.startsWith('+');
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        <Icon className={`stat-card-icon ${iconColor || 'text-gray-500'}`} />
      </div>
      <div className="stat-card-content">
        <p className="stat-card-value">{value}</p>
        {change && (
          <span className={`stat-card-change ${isPositiveChange ? 'positive' : 'negative'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="stat-card-description">{description}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">Painel de Controle</h2>
          <p className="content-subtitle">Bem-vindo(a) de volta, Administrador!</p>
        </div>
        <button className="btn btn-primary">
          <PlusCircle size={18} />
          Adicionar Novo
        </button>
      </header>

      <section className="stats-grid-section">
        {dashboardStatsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            Icon={stat.Icon}
            iconColor={stat.iconColor}
            description={stat.description}
          />
        ))}
      </section>

      <section className="recent-activity-section">
        <h3 className="section-subtitle">Atividade Recente</h3>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Atividade</th>
                <th>Horário</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {recentActivityData.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.activity}</td>
                  <td>{activity.time}</td>
                  <td><span className={`badge badge-${activity.type.toLowerCase()}`}>{activity.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}