// src/pages/UserFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPlus, XCircle, Save, ArrowLeft } from 'lucide-react';
// O CSS principal (Dashboard.css) já é importado pelo DashboardLayout.jsx

const userRoles = ["Administrador", "Enfermeiro(a)", "Recepcionista"];
const userStatuses = ["Ativo", "Inativo"];

export default function UserFormPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEditMode = Boolean(userId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: userRoles[0], // Padrão para o primeiro papel
    phone: '',
    status: userStatuses[0], // Padrão para Ativo
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(!isEditMode); // Mostrar por padrão para novo, oculto para editar

  useEffect(() => {
    if (isEditMode) {
      console.log("Modo de Edição - Carregar dados para usuário ID:", userId);
      // Simular carregamento de dados da API
      // Exemplo: fetchUserData(userId).then(data => setFormData(data));
      setFormData({
        name: 'Ana Beatriz Costa (Exemplo)',
        email: 'anabeatriz.costa@example.com',
        role: 'Administrador',
        phone: '(11) 98765-4321',
        status: 'Ativo',
        password: '', // Senha não é pré-preenchida por segurança
        confirmPassword: ''
      });
      setShowPasswordFields(false); // Ocultar campos de senha por padrão no modo de edição
    } else {
      setShowPasswordFields(true); // Mostrar campos de senha para novo usuário
    }
  }, [isEditMode, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Nome completo é obrigatório.";
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Formato de email inválido.";
    }
    if (!formData.role) errors.role = "Função é obrigatória.";

    if (showPasswordFields || (!isEditMode && !formData.password)) { // Valida senha se campos estiverem visíveis ou se for novo usuário sem senha
        if (!formData.password) {
            errors.password = "Senha é obrigatória.";
        } else if (formData.password.length < 6) {
            errors.password = "Senha deve ter no mínimo 6 caracteres.";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "As senhas não coincidem.";
        }
    } else if (isEditMode && formData.password && formData.password.length < 6) { // Se editando e senha foi digitada
        errors.password = "Senha deve ter no mínimo 6 caracteres.";
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "As senhas não coincidem.";
        }
    }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Formulário com erros:", formErrors);
      return;
    }
    setIsLoading(true);
    console.log("Dados do formulário do usuário:", formData);
    // Remover confirmPassword antes de "enviar"
    const dataToSubmit = { ...formData };
    delete dataToSubmit.confirmPassword;

    setTimeout(() => {
      setIsLoading(false);
      alert(`Usuário "${formData.name}" ${isEditMode ? 'atualizado' : 'adicionado'} com sucesso! (Simulação)`);
      navigate('/admin/users');
    }, 1500);
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">
            {isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </h2>
          <p className="content-subtitle">
            {isEditMode ? 'Atualize os detalhes do usuário.' : 'Preencha os dados para cadastrar um novo usuário.'}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>
          <ArrowLeft size={18} />
          Voltar para Lista
        </button>
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-grid-2-cols">
            {/* Coluna 1 */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Nome Completo <span className="required-asterisk">*</span></label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={formErrors.name ? 'input-error' : ''} />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email <span className="required-asterisk">*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={formErrors.email ? 'input-error' : ''} />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Função <span className="required-asterisk">*</span></label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className={formErrors.role ? 'input-error' : ''}>
                  {userRoles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="phone">Telefone (Opcional)</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status <span className="required-asterisk">*</span></label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}>
                  {userStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              
              {isEditMode && (
                <div className="form-group">
                   <button 
                    type="button" 
                    onClick={() => setShowPasswordFields(prev => !prev)} 
                    className="btn-link"
                    style={{ marginBottom: '0.5rem', display: 'inline-block', fontSize: '0.85rem'}}
                  >
                    {showPasswordFields ? 'Cancelar Alteração de Senha' : 'Alterar Senha'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Seção de Senha (condicional) */}
          {showPasswordFields && (
            <div className="form-section-divider">
              <h3 className="form-section-title">{isEditMode ? 'Alterar Senha (Deixe em branco para não alterar)' : 'Definir Senha'}</h3>
              <div className="form-grid-2-cols">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="password">Senha {isEditMode && !formData.password ? '' : <span className="required-asterisk">*</span>}</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={formErrors.password ? 'input-error' : ''} />
                    {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha {isEditMode && !formData.password ? '' : <span className="required-asterisk">*</span>}</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={formErrors.confirmPassword ? 'input-error' : ''} />
                    {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/users')} disabled={isLoading}>
              <XCircle size={18} /> Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              <Save size={18} /> {isLoading ? (isEditMode ? 'Atualizando...' : 'Salvando...') : (isEditMode ? 'Salvar Alterações' : 'Adicionar Usuário')}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}