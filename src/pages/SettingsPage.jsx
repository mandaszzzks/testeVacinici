// src/pages/SettingsPage.jsx

import React, { useState, useEffect } from 'react';
import { Save, Globe, BellRing, Shield } from 'lucide-react';
// O CSS principal (Dashboard.css) já é importado pelo DashboardLayout.jsx

// Chave para o localStorage
const SETTINGS_STORAGE_KEY = 'vacinasysAppSettings';

// Valores padrão
const defaultSettings = {
  clinicName: "Clínica VacinaSys Central",
  timezone: "America/Sao_Paulo",
  dateFormat: "dd/MM/yyyy",
  emailReminders: true,
  notificationEmail: "notificacoes@vacinasys.com.br",
  lowStockAlerts: true,
  twoFactorAuth: false,
};

// Componente simples para um item de configuração (mantido da versão anterior)
const SettingItem = ({ label, description, children, htmlFor }) => (
  <div className="setting-item">
    <div className="setting-item-label-group">
      <label htmlFor={htmlFor} className="setting-item-label">{label}</label>
      {description && <p className="setting-item-description">{description}</p>}
    </div>
    <div className="setting-item-control">
      {children}
    </div>
  </div>
);

// Componente simples para um switch (mantido da versão anterior)
const ToggleSwitch = ({ id, name, checked, onChange, label }) => (
  <div className="toggle-switch-container">
    {label && <label htmlFor={id} className="toggle-switch-label-text">{label}</label>}
    <label className="toggle-switch" htmlFor={id}>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  </div>
);


export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // Para feedback de salvamento

  // Carregar configurações do localStorage ao montar o componente
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSaveStatus(''); // Limpa o status ao mudar algo
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveStatus('');

    // Simulação de salvamento
    setTimeout(() => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      setIsLoading(false);
      setSaveStatus("Configurações salvas com sucesso!");
      console.log("Configurações salvas no localStorage:", settings);
      setTimeout(() => setSaveStatus(''), 3000); // Limpa a mensagem após 3 segundos
    }, 1000);
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">Configurações do Sistema</h2>
          <p className="content-subtitle">Ajuste as preferências gerais, notificações e segurança.</p>
        </div>
        {/* Botão Salvar agora está no final do formulário */}
      </header>

      <form onSubmit={handleSaveSettings} className="settings-form">
        {/* Seção de Configurações Gerais */}
        <section className="settings-section">
          <h3 className="settings-section-title">
            <Globe size={22} className="section-title-icon" />
            Gerais
          </h3>
          <SettingItem label="Nome da Clínica/Sistema" htmlFor="clinicName">
            <input 
              type="text" 
              id="clinicName"
              name="clinicName" 
              value={settings.clinicName} 
              onChange={handleChange}
              className="settings-input" 
            />
          </SettingItem>
          <SettingItem label="Fuso Horário" htmlFor="timezone">
            <select 
              id="timezone"
              name="timezone"
              value={settings.timezone} 
              onChange={handleChange}
              className="settings-select"
            >
              <option value="America/Sao_Paulo">(GMT-03:00) São Paulo</option>
              <option value="America/New_York">(GMT-05:00) Nova York</option>
              <option value="Europe/London">(GMT+00:00) Londres</option>
              {/* Adicione mais fusos horários relevantes */}
            </select>
          </SettingItem>
          <SettingItem label="Formato de Data Padrão" htmlFor="dateFormat">
            <select 
              id="dateFormat"
              name="dateFormat"
              value={settings.dateFormat} 
              onChange={handleChange}
              className="settings-select"
            >
              <option value="dd/MM/yyyy">DD/MM/YYYY (ex: {new Date().toLocaleDateString('pt-BR')})</option>
              <option value="MM/dd/yyyy">MM/DD/YYYY (ex: {new Date().toLocaleDateString('en-US')})</option>
              <option value="yyyy-MM-dd">YYYY-MM-DD (ex: {new Date().toISOString().split('T')[0]})</option>
            </select>
          </SettingItem>
        </section>

        {/* Seção de Notificações */}
        <section className="settings-section">
          <h3 className="settings-section-title">
            <BellRing size={22} className="section-title-icon" />
            Notificações
          </h3>
          <SettingItem label="Lembretes de Vacina por E-mail" description="Enviar e-mails automáticos para pacientes sobre próximas vacinas.">
            <ToggleSwitch 
              id="emailReminders" 
              name="emailReminders"
              checked={settings.emailReminders} 
              onChange={handleChange} 
            />
          </SettingItem>
          <SettingItem label="E-mail Remetente" htmlFor="notificationEmail" description="Endereço de e-mail usado para enviar notificações.">
            <input 
              type="email" 
              id="notificationEmail" 
              name="notificationEmail"
              value={settings.notificationEmail}
              onChange={handleChange}
              className="settings-input" 
            />
          </SettingItem>
          <SettingItem label="Alertas de Estoque Baixo" description="Receber notificações quando o estoque de uma vacina estiver baixo.">
            <ToggleSwitch 
              id="lowStockAlerts" 
              name="lowStockAlerts"
              checked={settings.lowStockAlerts} 
              onChange={handleChange} 
            />
          </SettingItem>
        </section>

        {/* Seção de Segurança */}
        <section className="settings-section">
          <h3 className="settings-section-title">
            <Shield size={22} className="section-title-icon" />
            Segurança
          </h3>
          <SettingItem label="Política de Senha" description="Requisitos mínimos para senhas de usuários. (Informativo)">
            <p className="setting-text-info">Mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números.</p>
          </SettingItem>
          <SettingItem label="Autenticação de Dois Fatores (2FA)" description="Adicionar uma camada extra de segurança ao login.">
            <ToggleSwitch 
              id="twoFactorAuth" 
              name="twoFactorAuth"
              checked={settings.twoFactorAuth} 
              onChange={handleChange} 
            />
          </SettingItem>
        </section>

        <div className="settings-form-actions">
          {saveStatus && <span className="save-status-message">{saveStatus}</span>}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            <Save size={18} />
            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </>
  );
}