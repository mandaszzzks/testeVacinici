import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
// Importaremos o CSS do Dashboard que conterá os estilos do modal
// import '../../styles/Dashboard.css'; // Ajuste o caminho se a estrutura for diferente

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Ação",
  message = "Você tem certeza que deseja prosseguir com esta ação?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  icon, // Opcional: um ícone para o modal
  isDestructive = false // Para estilizar o botão de confirmação como destrutivo (vermelho)
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            {icon ? React.cloneElement(icon, { size: 22, className: 'modal-title-icon' }) : (isDestructive && <AlertTriangle size={22} className="modal-title-icon destructive" />)}
            <h3 className="modal-title">{title}</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            className={`btn ${isDestructive ? 'btn-danger' : 'btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}