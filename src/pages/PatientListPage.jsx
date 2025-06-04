// src/pages/PatientListPage.jsx

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, PlusCircle, Search, UserRound, FileText, UserX, ArrowUp, ArrowDown } from 'lucide-react';
import ConfirmationModal from '../components/shared/ConfirmationModal'; // Ajuste o caminho se necessário

const initialPatientsData = [
  { id: 'pat_001', name: 'Roberto Carlos Almeida', dob: '15/05/1985', cpf: '123.456.789-00', phone: '(11) 98877-6655', lastVaccine: 'Gripe (10/04/2025)', nextAppointment: 'Reforço Covid (15/09/2025)', avatar: 'https://via.placeholder.com/40/76ABAE/FFFFFF?text=RA', nomeMae: 'Maria Rita Almeida', genero: 'Masculino', cep: '01000-000', logradouro: 'Rua Exemplo', numero: '123', complemento: 'Apto 4B', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', email: 'roberto.almeida@example.com', observacoesMedicas: 'Nenhuma alergia conhecida. Já teve catapora.' },
  { id: 'pat_002', name: 'Fernanda Lima Souza', dob: '22/09/1992', cpf: '987.654.321-11', phone: '(21) 97766-5544', lastVaccine: 'Hepatite B (20/01/2025)', nextAppointment: 'Avaliação (05/07/2025)', avatar: 'https://via.placeholder.com/40/FFA07A/FFFFFF?text=FS', nomeMae: 'Ana Lima', genero: 'Feminino', cep: '20000-000', logradouro: 'Avenida Principal', numero: '456', complemento: '', bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ', email: 'fernanda.lima@example.com', observacoesMedicas: 'Alergia a penicilina.' },
  { id: 'pat_003', name: 'Lucas Gabriel Martins', dob: '10/01/2018', cpf: '111.222.333-44', phone: '(31) 96655-4433', lastVaccine: 'Tríplice Viral (01/03/2025)', nextAppointment: 'Pediatra (12/08/2025)', avatar: 'https://via.placeholder.com/40/AED6F1/3A3D3A?text=LM', nomeMae: 'Sofia Martins', genero: 'Masculino', cep: '30000-000', logradouro: 'Praça da Liberdade', numero: '789', complemento: 'Casa', bairro: 'Savassi', cidade: 'Belo Horizonte', estado: 'MG', email: '', observacoesMedicas: 'Asma leve, controlada.' },
  { id: 'pat_004', name: 'Beatriz Oliveira Santos', dob: '05/07/1970', cpf: '444.555.666-77', phone: '(71) 95544-3322', lastVaccine: 'Febre Amarela (11/02/2025)', nextAppointment: 'Check-up Anual (20/11/2025)', avatar: 'https://via.placeholder.com/40/FFC3A0/3A3D3A?text=BS' },
  { id: 'pat_005', name: 'Thiago Pereira Costa', dob: '19/11/2001', cpf: '777.888.999-00', phone: '(81) 94433-2211', lastVaccine: 'HPV (01/06/2025)', nextAppointment: 'Dermatologista (03/10/2025)', avatar: 'https://via.placeholder.com/40/A0C4FF/3A3D3A?text=TC' },
];

export default function PatientListPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatientsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const handleAddPatient = () => navigate('/admin/patients/new');
  const handleEditPatient = (patientId) => navigate(`/admin/patients/edit/${patientId}`);
  const handleViewDetails = (patientId) => navigate(`/admin/patients/detail/${patientId}`);
  
  const requestDeletePatient = (patient) => {
    setPatientToDelete(patient);
    setIsModalOpen(true);
  };
  const confirmDeletePatient = () => {
    if (patientToDelete) {
      setPatients(prevPatients => prevPatients.filter(p => p.id !== patientToDelete.id));
    }
    setIsModalOpen(false);
    setPatientToDelete(null);
  };
  const cancelDeletePatient = () => {
    setIsModalOpen(false);
    setPatientToDelete(null);
  };

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return patients;
    }
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.phone && patient.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [patients, searchTerm]);

  const sortedPatients = useMemo(() => {
    let sortablePatients = [...filteredPatients];
    if (sortConfig.key !== null) {
      sortablePatients.sort((a, b) => {
        const valA = String(a[sortConfig.key] || '').toLowerCase();
        const valB = String(b[sortConfig.key] || '').toLowerCase();
        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortablePatients;
  }, [filteredPatients, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
          <h2 className="content-title">Gerenciamento de Pacientes</h2>
          <p className="content-subtitle">Visualize e gerencie os pacientes do sistema.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddPatient}>
          <PlusCircle size={18} />
          Adicionar Paciente
        </button>
      </header>

      <div className="table-controls">
        <div className="search-input-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar paciente por nome, CPF ou telefone..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="patient-list-section">
        <div className="table-container">
          {/* A CORREÇÃO É GARANTIR QUE NÃO HAJA ESPAÇO ENTRE A LINHA ABAIXO E A PRÓXIMA (<thead>) */}
          <table className="custom-table sortable-table"><thead>
              <tr>
                <th onClick={() => requestSort('name')}>Nome {getSortIcon('name')}</th>
                <th onClick={() => requestSort('dob')}>Data de Nasc. {getSortIcon('dob')}</th>
                <th onClick={() => requestSort('cpf')}>CPF {getSortIcon('cpf')}</th>
                <th onClick={() => requestSort('phone')}>Contato {getSortIcon('phone')}</th>
                <th onClick={() => requestSort('lastVaccine')}>Última Vacina {getSortIcon('lastVaccine')}</th>
                <th onClick={() => requestSort('nextAppointment')}>Próximo Agend. {getSortIcon('nextAppointment')}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="user-info-cell">
                      <img src={patient.avatar} alt={patient.name} className="user-avatar" />
                      <div>
                        <Link to={`/admin/patients/detail/${patient.id}`} className="table-link user-name-link">
                            {patient.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{patient.dob}</td>
                  <td>{patient.cpf}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.lastVaccine}</td>
                  <td>{patient.nextAppointment}</td>
                  <td>
                    <div className="actions-cell">
                       <button 
                        className="btn-icon btn-view-details"
                        title="Ver Detalhes do Paciente"
                        onClick={() => handleViewDetails(patient.id)}
                      >
                        <FileText size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-edit" 
                        title="Editar Paciente"
                        onClick={() => handleEditPatient(patient.id)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Remover Paciente"
                        onClick={() => requestDeletePatient(patient)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedPatients.length === 0 && searchTerm && (
            <p className="no-results-message">Nenhum paciente encontrado para "{searchTerm}".</p>
          )}
        </div>
      </section>
      
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDeletePatient}
        onConfirm={confirmDeletePatient}
        title="Confirmar Exclusão de Paciente"
        message={`Você tem certeza que deseja excluir o paciente "${patientToDelete?.name}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir Paciente"
        cancelText="Cancelar"
        icon={<UserX />}
        isDestructive={true}
      />
    </>
  );
}