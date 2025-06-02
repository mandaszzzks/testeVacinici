// src/pages/PatientFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPlus2, XCircle, Save, ArrowLeft } from 'lucide-react';

const generos = ["Feminino", "Masculino", "Outro", "Prefiro não informar"];
// VARIÁVEL CORRIGIDA AQUI:
const estadosBrasileiros = [ 
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", 
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", 
  "SC", "SP", "SE", "TO"
];

export default function PatientFormPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const isEditMode = Boolean(patientId);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    nomeMae: '',
    genero: generos[0],
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: estadosBrasileiros[0], // Usa o primeiro estado como padrão
    telefoneCelular: '',
    email: '',
    observacoesMedicas: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      console.log("Modo de Edição - Carregar dados para paciente ID:", patientId);
      setFormData({
        nomeCompleto: 'Roberto Carlos Almeida (Edição)',
        dataNascimento: '1985-05-15',
        cpf: '123.456.789-00',
        nomeMae: 'Maria Almeida',
        genero: 'Masculino',
        cep: '01000-000',
        logradouro: 'Rua Exemplo',
        numero: '123',
        complemento: 'Apto 4B',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        telefoneCelular: '(11) 98877-6655',
        email: 'roberto.almeida@example.com',
        observacoesMedicas: 'Nenhuma alergia conhecida.'
      });
    }
  }, [isEditMode, patientId]);

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

  const isValidCPF = (cpf) => {
    if (!cpf) return false;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  };
  
  const isValidCEP = (cep) => {
    if (!cep) return true; 
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nomeCompleto.trim()) errors.nomeCompleto = "Nome completo é obrigatório.";
    if (!formData.dataNascimento) errors.dataNascimento = "Data de nascimento é obrigatória.";
    if (!formData.cpf.trim()) {
        errors.cpf = "CPF é obrigatório.";
    } else if (!isValidCPF(formData.cpf)) {
        errors.cpf = "Formato de CPF inválido (ex: 000.000.000-00).";
    }
    if (!formData.telefoneCelular.trim()) errors.telefoneCelular = "Telefone celular é obrigatório.";
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Formato de email inválido.";
    }
     if (formData.cep.trim() && !isValidCEP(formData.cep)) {
      errors.cep = "Formato de CEP inválido (ex: 00000-000).";
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
    console.log("Dados do formulário do paciente:", formData);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Paciente "${formData.nomeCompleto}" ${isEditMode ? 'atualizado' : 'adicionado'} com sucesso! (Simulação)`);
      navigate('/admin/patients');
    }, 1500);
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">
            {isEditMode ? 'Editar Paciente' : 'Adicionar Novo Paciente'}
          </h2>
          <p className="content-subtitle">
            {isEditMode ? 'Atualize os dados cadastrais do paciente.' : 'Preencha os dados para cadastrar um novo paciente.'}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/patients')}>
          <ArrowLeft size={18} />
          Voltar para Lista
        </button>
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit} className="custom-form">
          
          <div className="form-section-divider">
            <h3 className="form-section-title">Dados Pessoais</h3>
            <div className="form-grid-2-cols">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="nomeCompleto">Nome Completo <span className="required-asterisk">*</span></label>
                  <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} className={formErrors.nomeCompleto ? 'input-error' : ''} />
                  {formErrors.nomeCompleto && <span className="error-message">{formErrors.nomeCompleto}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="dataNascimento">Data de Nascimento <span className="required-asterisk">*</span></label>
                  <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className={formErrors.dataNascimento ? 'input-error' : ''} />
                  {formErrors.dataNascimento && <span className="error-message">{formErrors.dataNascimento}</span>}
                </div>
              </div>
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="cpf">CPF <span className="required-asterisk">*</span></label>
                  <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" className={formErrors.cpf ? 'input-error' : ''} />
                  {formErrors.cpf && <span className="error-message">{formErrors.cpf}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="genero">Gênero</label>
                  <select id="genero" name="genero" value={formData.genero} onChange={handleChange}>
                    {generos.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group form-group-full-width">
                <label htmlFor="nomeMae">Nome da Mãe (Opcional)</label>
                <input type="text" id="nomeMae" name="nomeMae" value={formData.nomeMae} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section-divider">
            <h3 className="form-section-title">Endereço</h3>
            <div className="form-grid-2-cols">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" className={formErrors.cep ? 'input-error' : ''}/>
                        {formErrors.cep && <span className="error-message">{formErrors.cep}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="logradouro">Logradouro (Rua, Av.)</label>
                        <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numero">Número</label>
                        <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="complemento">Complemento</label>
                        <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select id="estado" name="estado" value={formData.estado} onChange={handleChange}>
                        {/* VARIÁVEL CORRIGIDA AQUI NO MAP TAMBÉM */}
                        {estadosBrasileiros.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                    </div>
                </div>
            </div>
          </div>

          <div className="form-section-divider">
            <h3 className="form-section-title">Contato e Informações Adicionais</h3>
            <div className="form-grid-2-cols">
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="telefoneCelular">Telefone Celular <span className="required-asterisk">*</span></label>
                        <input type="tel" id="telefoneCelular" name="telefoneCelular" value={formData.telefoneCelular} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" className={formErrors.telefoneCelular ? 'input-error' : ''} />
                        {formErrors.telefoneCelular && <span className="error-message">{formErrors.telefoneCelular}</span>}
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="email">Email (Opcional)</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={formErrors.email ? 'input-error' : ''} />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                </div>
            </div>
            <div className="form-group form-group-full-width">
                <label htmlFor="observacoesMedicas">Observações Médicas / Alergias (Opcional)</label>
                <textarea id="observacoesMedicas" name="observacoesMedicas" value={formData.observacoesMedicas} onChange={handleChange} rows="4"></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/patients')} disabled={isLoading}>
              <XCircle size={18} /> Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              <Save size={18} /> {isLoading ? (isEditMode ? 'Atualizando...' : 'Salvando...') : (isEditMode ? 'Salvar Alterações' : 'Adicionar Paciente')}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}