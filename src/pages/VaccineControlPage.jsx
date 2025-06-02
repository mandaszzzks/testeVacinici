// src/pages/VaccineControlPage.jsx

import React, { useState, useMemo } from 'react'; // ADICIONADO useMemo
import { useNavigate, Link } from 'react-router-dom';
// ADICIONADO ArrowUp, ArrowDown
import { 
    Edit, Trash2, PlusCircle, Search, PackageSearch, AlertTriangle, CheckCircle2, 
    Syringe as SyringeIcon, PackageX, ArrowUp, ArrowDown 
} from 'lucide-react';
import ConfirmationModal from '../components/shared/ConfirmationModal';

const initialVaccinesData = [
  { id: 'vac_001', name: 'Coronavac', type: 'Inativada', manufacturer: 'Sinovac', batch: 'L2024001', expiryDate: '31/12/2025', stock: 1500, status: 'Disponível', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
  { id: 'vac_002', name: 'Pfizer-BioNTech', type: 'RNA Mensageiro', manufacturer: 'Pfizer/BioNTech', batch: 'PZ2024B05', expiryDate: '30/11/2025', stock: 250, status: 'Baixo Estoque', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
  { id: 'vac_003', name: 'AstraZeneca', type: 'Vetor Viral', manufacturer: 'Oxford/AstraZeneca', batch: 'AZ2023C12', expiryDate: '31/05/2025', stock: 0, status: 'Vencida', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
  { id: 'vac_004', name: 'Janssen', type: 'Vetor Viral', manufacturer: 'Johnson & Johnson', batch: 'JJ2024D08', expiryDate: '28/02/2026', stock: 800, status: 'Disponível', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
  { id: 'vac_005', name: 'Sputnik V', type: 'Vetor Viral', manufacturer: 'Gamaleya', batch: 'SP2024E03', expiryDate: '31/07/2025', stock: 45, status: 'Baixo Estoque', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
  { id: 'vac_006', name: 'Moderna', type: 'RNA Mensageiro', manufacturer: 'Moderna', batch: 'MD2024X10', expiryDate: '30/09/2025', stock: 550, status: 'Disponível', icon: <SyringeIcon size={16} className="table-icon vaccine-icon" /> },
];

const getStatusIcon = (status) => {
  if (status === 'Disponível') { return <CheckCircle2 size={16} className="status-icon status-disponivel" />; }
  else if (status === 'Baixo Estoque') { return <PackageSearch size={16} className="status-icon status-baixo-estoque" />; }
  else if (status === 'Vencida') { return <AlertTriangle size={16} className="status-icon status-vencida" />; }
  return null;
};

export default function VaccineControlPage() {
  const navigate = useNavigate();
  const [vaccines, setVaccines] = useState(initialVaccinesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vaccineToDelete, setVaccineToDelete] = useState(null);

  // Estados para Filtro e Ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const handleAddVaccine = () => navigate('/admin/vaccines/new');
  const handleEditVaccine = (vaccineId) => navigate(`/admin/vaccines/edit/${vaccineId}`);
  
  const requestDeleteVaccine = (vaccine) => {
    setVaccineToDelete(vaccine);
    setIsModalOpen(true);
  };
  const confirmDeleteVaccine = () => {
    if (vaccineToDelete) {
      setVaccines(prevVaccines => prevVaccines.filter(v => v.id !== vaccineToDelete.id));
    }
    setIsModalOpen(false);
    setVaccineToDelete(null);
  };
  const cancelDeleteVaccine = () => {
    setIsModalOpen(false);
    setVaccineToDelete(null);
  };

  // Lógica de Filtragem
  const filteredVaccines = useMemo(() => {
    if (!searchTerm) {
      return vaccines;
    }
    return vaccines.filter(vaccine =>
      vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.batch.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vaccines, searchTerm]);

  // Lógica de Ordenação
  const sortedVaccines = useMemo(() => {
    let sortableVaccines = [...filteredVaccines];
    if (sortConfig.key !== null) {
      sortableVaccines.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Tratamento para ordenação numérica (ex: estoque)
        if (sortConfig.key === 'stock') {
          valA = parseFloat(valA);
          valB = parseFloat(valB);
        } else {
        // Para outras colunas, ordenação de string case-insensitive
          valA = String(valA || '').toLowerCase(); // Trata nulos/undefined para evitar erros
          valB = String(valB || '').toLowerCase();
        }

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableVaccines;
  }, [filteredVaccines, sortConfig]);

  // Função para solicitar ordenação
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Função para renderizar o ícone de ordenação
  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
    }
    return null;
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">Controle de Vacinas</h2>
          <p className="content-subtitle">Gerencie o estoque e informações das vacinas.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddVaccine}>
          <PlusCircle size={18} />
          Adicionar Vacina
        </button>
      </header>

      <div className="table-controls">
        <div className="search-input-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar vacina por nome, fabricante ou lote..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="vaccine-list-section">
        <div className="table-container">
          <table className="custom-table sortable-table"> {/* Adicionada classe sortable-table */}
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>Nome da Vacina {getSortIcon('name')}</th>
                <th onClick={() => requestSort('type')}>Tipo {getSortIcon('type')}</th>
                <th onClick={() => requestSort('manufacturer')}>Fabricante {getSortIcon('manufacturer')}</th>
                <th onClick={() => requestSort('batch')}>Lote {getSortIcon('batch')}</th>
                <th onClick={() => requestSort('expiryDate')}>Validade {getSortIcon('expiryDate')}</th>
                <th onClick={() => requestSort('stock')}>Estoque {getSortIcon('stock')}</th>
                <th onClick={() => requestSort('status')}>Status {getSortIcon('status')}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedVaccines.map((vaccine) => ( // Mapeando sobre sortedVaccines
                <tr key={vaccine.id}>
                  <td>
                    <div className="vaccine-info-cell">
                      {vaccine.icon}
                      <Link to={`/admin/vaccines/detail/${vaccine.id}`} className="table-link">
                        {vaccine.name}
                      </Link>
                    </div>
                  </td>
                  <td>{vaccine.type}</td>
                  <td>{vaccine.manufacturer}</td>
                  <td>{vaccine.batch}</td>
                  <td>{vaccine.expiryDate}</td>
                  <td>{vaccine.stock}</td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(vaccine.status)}
                      <span className={`badge badge-status-${vaccine.status.toLowerCase().replace(' ', '-')}`}>
                        {vaccine.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="btn-icon btn-edit" 
                        title="Editar Vacina"
                        onClick={() => handleEditVaccine(vaccine.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Remover Vacina"
                        onClick={() => requestDeleteVaccine(vaccine)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedVaccines.length === 0 && searchTerm && (
            <p className="no-results-message">Nenhuma vacina encontrada para "{searchTerm}".</p>
          )}
        </div>
      </section>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDeleteVaccine}
        onConfirm={confirmDeleteVaccine}
        title="Confirmar Exclusão de Vacina"
        message={`Você tem certeza que deseja excluir a vacina "${vaccineToDelete?.name}" (Lote: ${vaccineToDelete?.batch})? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir Vacina"
        cancelText="Cancelar"
        icon={<PackageX />}
        isDestructive={true}
      />
    </>
  );
}