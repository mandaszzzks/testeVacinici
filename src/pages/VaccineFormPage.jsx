// src/pages/VaccineFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Para navegação e pegar IDs da URL (para edição)
import { PackagePlus, XCircle, Save, ArrowLeft } from 'lucide-react';
// O CSS principal já é importado pelo DashboardLayout.jsx

// Dados de exemplo para tipos de vacina (no futuro, pode vir de uma API ou config)
const vaccineTypes = ["Inativada", "RNA Mensageiro", "Vetor Viral", "Atenuada", "Subunidade Proteica"];

export default function VaccineFormPage() {
  const navigate = useNavigate();
  const { vaccineId } = useParams(); // Para pegar o ID da vacina no modo de edição
  const isEditMode = Boolean(vaccineId);

  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    name: '',
    type: vaccineTypes[0], // Padrão para o primeiro tipo
    manufacturer: '',
    batch: '',
    dosesPerVial: '', // Doses por frasco
    stockQuantity: '', // Quantidade de frascos em estoque
    expiryDate: '',
    targetAudience: '', // Ex: Crianças, Idosos, Geral
    storageInfo: '', // Ex: Refrigerada 2-8°C
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false); // Para simular o envio
  const [formErrors, setFormErrors] = useState({});

  // Se estiver em modo de edição, carregaria os dados da vacina (simulação)
  useEffect(() => {
    if (isEditMode) {
      // Simular carregamento de dados da API
      console.log("Modo de Edição - Carregar dados para vacina ID:", vaccineId);
      // Exemplo:
      // fetchVaccineData(vaccineId).then(data => setFormData(data));
      setFormData({
        name: 'Coronavac (Exemplo Edição)',
        type: 'Inativada',
        manufacturer: 'Sinovac',
        batch: 'L2024001',
        dosesPerVial: '1',
        stockQuantity: '1500',
        expiryDate: '2025-12-31', // Formato YYYY-MM-DD para input date
        targetAudience: 'Adultos 18+',
        storageInfo: 'Refrigerada 2-8°C, não congelar',
        notes: 'Vacina padrão para campanha XYZ.'
      });
    }
  }, [isEditMode, vaccineId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Limpar erro do campo ao digitar
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Nome da vacina é obrigatório.";
    if (!formData.type) errors.type = "Tipo da vacina é obrigatório.";
    if (!formData.manufacturer.trim()) errors.manufacturer = "Fabricante é obrigatório.";
    if (!formData.batch.trim()) errors.batch = "Lote é obrigatório.";
    if (!formData.stockQuantity.trim() || isNaN(formData.stockQuantity) || Number(formData.stockQuantity) < 0) {
      errors.stockQuantity = "Quantidade em estoque deve ser um número válido.";
    }
    if (!formData.expiryDate) errors.expiryDate = "Data de validade é obrigatória.";
    // Adicione mais validações conforme necessário
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
    console.log("Dados do formulário:", formData);
    // Simulação de envio para API
    setTimeout(() => {
      setIsLoading(false);
      alert(`Vacina "${formData.name}" ${isEditMode ? 'atualizada' : 'adicionada'} com sucesso! (Simulação)`);
      navigate('/admin/vaccines'); // Volta para a lista de vacinas
    }, 1500);
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">
            {isEditMode ? 'Editar Vacina' : 'Adicionar Nova Vacina'}
          </h2>
          <p className="content-subtitle">
            {isEditMode ? 'Atualize os detalhes da vacina.' : 'Preencha os dados para cadastrar uma nova vacina no sistema.'}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/vaccines')}>
          <ArrowLeft size={18} />
          Voltar para Lista
        </button>
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-grid-2-cols"> {/* Grid para melhor layout */}
            {/* Coluna 1 */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name">Nome da Vacina <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? 'input-error' : ''}
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="type">Tipo <span className="required-asterisk">*</span></label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={formErrors.type ? 'input-error' : ''}
                >
                  {vaccineTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {formErrors.type && <span className="error-message">{formErrors.type}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="manufacturer">Fabricante <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className={formErrors.manufacturer ? 'input-error' : ''}
                />
                {formErrors.manufacturer && <span className="error-message">{formErrors.manufacturer}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="batch">Lote <span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="batch"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className={formErrors.batch ? 'input-error' : ''}
                />
                {formErrors.batch && <span className="error-message">{formErrors.batch}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="dosesPerVial">Doses por Frasco</label>
                <input
                  type="number"
                  id="dosesPerVial"
                  name="dosesPerVial"
                  value={formData.dosesPerVial}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="stockQuantity">Quantidade em Estoque (Frascos) <span className="required-asterisk">*</span></label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  min="0"
                  className={formErrors.stockQuantity ? 'input-error' : ''}
                />
                {formErrors.stockQuantity && <span className="error-message">{formErrors.stockQuantity}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="expiryDate">Data de Validade <span className="required-asterisk">*</span></label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={formErrors.expiryDate ? 'input-error' : ''}
                />
                {formErrors.expiryDate && <span className="error-message">{formErrors.expiryDate}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="targetAudience">Público Alvo</label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="Ex: Crianças de 2-5 anos, Idosos 60+"
                />
              </div>

              <div className="form-group">
                <label htmlFor="storageInfo">Informações de Armazenamento</label>
                <textarea
                  id="storageInfo"
                  name="storageInfo"
                  value={formData.storageInfo}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Ex: Manter refrigerado entre 2°C e 8°C. Não congelar."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Campo de Notas (ocupa largura total) */}
          <div className="form-group form-group-full-width">
            <label htmlFor="notes">Observações Adicionais</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/vaccines')} disabled={isLoading}>
              <XCircle size={18} /> Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              <Save size={18} /> {isLoading ? (isEditMode ? 'Atualizando...' : 'Salvando...') : (isEditMode ? 'Salvar Alterações' : 'Adicionar Vacina')}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}