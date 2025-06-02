// src/components/shared/RegisterVaccinationModal.jsx

import React, { useState, useEffect } from 'react';
import { X, Save, Syringe as SyringeIcon } from 'lucide-react'; // Usando SyringeIcon aqui também

export default function RegisterVaccinationModal({
  isOpen,
  onClose,
  onSubmit,
  patientName,
  availableVaccines // Lista de vacinas disponíveis para o select: [{id: 'vac_001', name: 'Coronavac'}, ...]
}) {
  const today = new Date().toISOString().split('T')[0]; // Formato AAAA-MM-DD

  const initialFormData = {
    vaccineId: availableVaccines && availableVaccines.length > 0 ? availableVaccines[0].id : '',
    dose: '', // Ex: 1ª Dose, 2ª Dose, Reforço, Dose Única
    dateApplied: today,
    batch: '',
    professional: '', // Nome do profissional
    unit: '' // Unidade/Local de aplicação
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  // Resetar formulário quando o modal é reaberto ou fechado
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormData);
      setFormErrors({});
    }
  }, [isOpen, availableVaccines]); // Adicionado availableVaccines como dependência

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.vaccineId) errors.vaccineId = "Selecione uma vacina.";
    if (!formData.dose.trim()) errors.dose = "A dose é obrigatória.";
    if (!formData.dateApplied) errors.dateApplied = "A data de aplicação é obrigatória.";
    if (!formData.batch.trim()) errors.batch = "O lote é obrigatório.";
    if (!formData.professional.trim()) errors.professional = "O profissional é obrigatório.";
    if (!formData.unit.trim()) errors.unit = "A unidade de aplicação é obrigatória.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Encontrar o nome da vacina para passar junto
      const selectedVaccine = availableVaccines.find(v => v.id === formData.vaccineId);
      onSubmit({ ...formData, vaccineName: selectedVaccine?.name || 'Vacina Desconhecida' });
      onClose(); // Fecha o modal após submissão bem-sucedida
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box form-modal" onClick={(e) => e.stopPropagation()}> {/* Adicionada classe form-modal */}
        <div className="modal-header">
          <div className="modal-header-content">
            <SyringeIcon size={22} className="modal-title-icon" />
            <h3 className="modal-title">Registrar Vacinação para {patientName}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body modal-body-form"> {/* Classe para customizar padding/scroll se necessário */}
            <div className="custom-form"> {/* Reutilizando estilos de formulário */}
              <div className="form-grid-2-cols"> {/* Layout em duas colunas */}
                {/* Coluna 1 */}
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="vaccineId">Vacina <span className="required-asterisk">*</span></label>
                    <select
                      id="vaccineId"
                      name="vaccineId"
                      value={formData.vaccineId}
                      onChange={handleChange}
                      className={formErrors.vaccineId ? 'input-error' : ''}
                    >
                      <option value="" disabled>Selecione uma vacina</option>
                      {availableVaccines.map(vaccine => (
                        <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                      ))}
                    </select>
                    {formErrors.vaccineId && <span className="error-message">{formErrors.vaccineId}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dose">Dose <span className="required-asterisk">*</span></label>
                    <input
                      type="text"
                      id="dose"
                      name="dose"
                      value={formData.dose}
                      onChange={handleChange}
                      placeholder="Ex: 1ª Dose, Reforço"
                      className={formErrors.dose ? 'input-error' : ''}
                    />
                    {formErrors.dose && <span className="error-message">{formErrors.dose}</span>}
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
                </div>

                {/* Coluna 2 */}
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="dateApplied">Data da Aplicação <span className="required-asterisk">*</span></label>
                    <input
                      type="date"
                      id="dateApplied"
                      name="dateApplied"
                      value={formData.dateApplied}
                      onChange={handleChange}
                      max={today} // Não permite datas futuras
                      className={formErrors.dateApplied ? 'input-error' : ''}
                    />
                    {formErrors.dateApplied && <span className="error-message">{formErrors.dateApplied}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="professional">Profissional Responsável <span className="required-asterisk">*</span></label>
                    <input
                      type="text"
                      id="professional"
                      name="professional"
                      value={formData.professional}
                      onChange={handleChange}
                      className={formErrors.professional ? 'input-error' : ''}
                    />
                    {formErrors.professional && <span className="error-message">{formErrors.professional}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="unit">Unidade/Local de Aplicação <span className="required-asterisk">*</span></label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className={formErrors.unit ? 'input-error' : ''}
                    />
                    {formErrors.unit && <span className="error-message">{formErrors.unit}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={18} /> Registrar Vacinação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}