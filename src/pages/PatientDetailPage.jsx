// src/pages/PatientDetailPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit, UserCircle, CalendarIcon, UserSquare2, Users, MapPin, PhoneCall, Mail, 
  Stethoscope, AlertCircle, Syringe as SyringeIcon, Package, CalendarDays, Building, Hash, 
  CheckCircle2, PackageSearch, XSquare, PlusCircle 
} from 'lucide-react';
import RegisterVaccinationModal from '../components/shared/RegisterVaccinationModal'; // Importa o novo modal

// Dados de exemplo para pacientes
const initialPatientsData = [
  { id: 'pat_001', name: 'Roberto Carlos Almeida', dob: '15/05/1985', cpf: '123.456.789-00', phone: '(11) 98877-6655', lastVaccineSummary: 'Gripe (10/04/2025)', nextAppointmentSummary: 'Reforço Covid (15/09/2025)', avatar: 'https://via.placeholder.com/100/76ABAE/FFFFFF?text=RA', nomeMae: 'Maria Rita Almeida', genero: 'Masculino', cep: '01000-000', logradouro: 'Rua Exemplo', numero: '123', complemento: 'Apto 4B', bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', email: 'roberto.almeida@example.com', observacoesMedicas: 'Nenhuma alergia conhecida. Já teve catapora.', status: 'Ativo' },
  { id: 'pat_002', name: 'Fernanda Lima Souza', dob: '22/09/1992', cpf: '987.654.321-11', phone: '(21) 97766-5544', lastVaccineSummary: 'Hepatite B (20/01/2025)', nextAppointmentSummary: 'Avaliação (05/07/2025)', avatar: 'https://via.placeholder.com/100/FFA07A/FFFFFF?text=FS', nomeMae: 'Ana Lima', genero: 'Feminino', cep: '20000-000', logradouro: 'Avenida Principal', numero: '456', complemento: '', bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ', email: 'fernanda.lima@example.com', observacoesMedicas: 'Alergia a penicilina.', status: 'Ativo' },
  { id: 'pat_003', name: 'Lucas Gabriel Martins', dob: '10/01/2018', cpf: '111.222.333-44', phone: '(31) 96655-4433', lastVaccineSummary: 'Tríplice Viral (01/03/2025)', nextAppointmentSummary: 'Pediatra (12/08/2025)', avatar: 'https://via.placeholder.com/100/AED6F1/3A3D3A?text=LM', nomeMae: 'Sofia Martins', genero: 'Masculino', cep: '30000-000', logradouro: 'Praça da Liberdade', numero: '789', complemento: 'Casa', bairro: 'Savassi', cidade: 'Belo Horizonte', estado: 'MG', email: '', observacoesMedicas: 'Asma leve, controlada.', status: 'Inativo' },
];

// Dados de exemplo para o histórico de vacinação (simulando uma "base de dados" mutável)
// Em uma aplicação real, isso seria gerenciado de forma mais robusta (Ex: Contexto, Redux, ou direto com API)
let mockPatientVaccinationHistories = {
  'pat_001': [
    { id: 'vh_001', vaccineName: 'Gripe Anual', dose: 'Dose Única', dateApplied: '10/04/2025', batch: 'GR2025A01', professional: 'Dr. Silva', unit: 'Clínica Central' },
    { id: 'vh_002', vaccineName: 'COVID-19 Bivalente', dose: 'Reforço', dateApplied: '15/09/2024', batch: 'CVBIVAL00X', professional: 'Enf. Joana Lima', unit: 'Posto Saúde Bairro Feliz' },
    { id: 'vh_003', vaccineName: 'Febre Amarela', dose: 'Dose Única', dateApplied: '20/01/2020', batch: 'FA2020BR03', professional: 'Dr. Silva', unit: 'Clínica Central' },
  ],
  'pat_002': [
    { id: 'vh_004', vaccineName: 'Hepatite B', dose: '1ª Dose', dateApplied: '20/01/2025', batch: 'HB2025X1', professional: 'Enf. Carlos Dias', unit: 'Clínica Central' },
    { id: 'vh_005', vaccineName: 'Hepatite B', dose: '2ª Dose', dateApplied: '20/02/2025', batch: 'HB2025X2', professional: 'Enf. Carlos Dias', unit: 'Clínica Central' },
    { id: 'vh_006', vaccineName: 'Hepatite B', dose: '3ª Dose', dateApplied: '20/07/2025', batch: 'HB2025X3', professional: 'Enf. Carlos Dias', unit: 'Clínica Central' },
  ],
  'pat_003': [
    { id: 'vh_007', vaccineName: 'Tríplice Viral (SCR)', dose: '1ª Dose', dateApplied: '01/03/2025', batch: 'SCR2025PED01', professional: 'Dra. Ana Paula', unit: 'Pediatria Bem Nascer' },
    { id: 'vh_008', vaccineName: 'Poliomielite Oral (VOP)', dose: 'Reforço', dateApplied: '15/03/2025', batch: 'VOP2025R01', professional: 'Dra. Ana Paula', unit: 'Pediatria Bem Nascer' },
    { id: 'vh_009', vaccineName: 'Pentavalente', dose: '3ª Dose', dateApplied: '10/07/2018', batch: 'PENTA18C003', professional: 'Dra. Ana Paula', unit: 'Pediatria Bem Nascer' },
  ],
};

// Dados das vacinas disponíveis para o select no modal
// Em um app real, isso viria de um estado global, contexto ou API.
const availableVaccinesForSelection = [
  { id: 'vac_001', name: 'Coronavac' },
  { id: 'vac_002', name: 'Pfizer-BioNTech' },
  { id: 'vac_003', name: 'AstraZeneca' },
  { id: 'vac_004', name: 'Janssen' },
  { id: 'vac_005', name: 'Sputnik V' },
  { id: 'vac_006', name: 'Moderna' },
  { id: 'vac_007', name: 'Gripe Anual' },
  { id: 'vac_008', name: 'Febre Amarela' },
  { id: 'vac_009', name: 'Hepatite B' },
  { id: 'vac_010', name: 'Tríplice Viral (SCR)' },
  { id: 'vac_011', name: 'Poliomielite Oral (VOP)' },
  { id: 'vac_012', name: 'Pentavalente' },
  // Adicione mais vacinas conforme necessário
];


const DetailItem = ({ icon, label, value, className = '' }) => ( /* ... (código do DetailItem) ... */ <div className={`detail-item ${className}`}>{icon && React.cloneElement(icon, { size: 18, className: 'detail-item-icon' })}<div className="detail-item-content"><span className="detail-item-label">{label}</span><span className="detail-item-value">{value || 'Não informado'}</span></div></div> );

export default function PatientDetailPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [vaccinationHistory, setVaccinationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Estado para o modal

  useEffect(() => {
    setLoading(true);
    const foundPatient = initialPatientsData.find(p => p.id === patientId);
    const history = mockPatientVaccinationHistories[patientId] || [];
    
    setTimeout(() => { 
      setPatient(foundPatient);
      setVaccinationHistory(history); // Define o histórico inicial
      setLoading(false);
    }, 300);
  }, [patientId]);

  if (loading) { /* ... (código do loading state) ... */ return <div className="loading-state">Carregando detalhes do paciente...</div>; }
  if (!patient) { /* ... (código do not-found state) ... */ return (<div className="not-found-state"><AlertCircle size={48} className="not-found-icon" /><h2>Paciente não encontrado</h2><p>O paciente com o ID "{patientId}" não foi encontrado no sistema.</p><button className="btn btn-secondary" onClick={() => navigate('/admin/patients')}><ArrowLeft size={18} /> Voltar para Lista de Pacientes</button></div>); }

  const getPatientStatusIcon = (status) => { /* ... (código do getPatientStatusIcon) ... */ if (status === 'Ativo') { return <CheckCircle2 size={14} />; } else if (status === 'Inativo') { return <XSquare size={14} />; } return null; };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleSubmitVaccinationRecord = (newRecord) => {
    console.log("Novo registro de vacinação:", newRecord);
    // Simular adição ao histórico
    const newHistoryEntry = {
      id: `vh_${Date.now()}`, // ID único simples
      ...newRecord,
      dateApplied: new Date(newRecord.dateApplied + 'T00:00:00').toLocaleDateString('pt-BR') // Formata a data para DD/MM/YYYY
    };

    // Atualiza o mock global (para persistência simulada entre navegações)
    if (!mockPatientVaccinationHistories[patientId]) {
      mockPatientVaccinationHistories[patientId] = [];
    }
    mockPatientVaccinationHistories[patientId].push(newHistoryEntry);
    
    // Atualiza o estado local para re-renderizar a tabela
    setVaccinationHistory(prevHistory => [...prevHistory, newHistoryEntry]);

    alert(`Vacina "${newRecord.vaccineName}" registrada para ${patient.name}! (Simulação)`);
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title page-detail-title">
            <UserCircle size={30} className="title-icon" /> Detalhes do Paciente
          </h2>
        </div>
        <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/admin/patients')}>
                <ArrowLeft size={18} /> Voltar para Lista
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/admin/patients/edit/${patient.id}`)}>
                <Edit size={18} /> Editar Paciente
            </button>
        </div>
      </header>

      <section className="patient-detail-content">
        {/* ... (seções de perfil, dados pessoais, endereço - como estavam) ... */}
        <div className="detail-card user-profile-card"> 
          <div className="user-profile-header">
            <img src={patient.avatar} alt={`Avatar de ${patient.name}`} className="user-detail-avatar" />
            <div className="user-profile-info">
              <h1 className="user-detail-name">{patient.name}</h1>
              <p className="user-detail-cpf"><UserSquare2 size={14} /> CPF: {patient.cpf || 'Não informado'}</p>
              <p className="user-detail-dob"><CalendarIcon size={14} /> Nascimento: {patient.dob || 'Não informado'}</p>
            </div>
          </div>
           <div className="user-profile-contact"> 
              <p><PhoneCall size={14} /> {patient.phone || 'Telefone não informado'}</p>
              <p><Mail size={14} /> {patient.email || 'Email não informado'}</p>
           </div>
           {patient.status && (
            <div className="user-profile-status" style={{marginTop: '1rem'}}>
                <span className={`badge badge-user-status-${patient.status.toLowerCase()}`}>
                    {getPatientStatusIcon(patient.status)}
                    {patient.status}
                </span>
            </div>
           )}
        </div>

        <div className="detail-card">
          <h3 className="detail-section-title">Dados Pessoais Adicionais</h3>
          <div className="detail-grid">
            <DetailItem icon={<Users />} label="Nome da Mãe" value={patient.nomeMae} />
            <DetailItem icon={<UserCircle />} label="Gênero" value={patient.genero} />
          </div>
        </div>
        
        <div className="detail-card">
          <h3 className="detail-section-title">Endereço</h3>
          <div className="detail-grid detail-grid-single-col">
            <DetailItem icon={<MapPin />} label="CEP" value={patient.cep} />
            <DetailItem icon={<MapPin />} label="Logradouro" value={patient.logradouro} />
            <DetailItem icon={<MapPin />} label="Número" value={patient.numero} />
            {patient.complemento && <DetailItem icon={<MapPin />} label="Complemento" value={patient.complemento} />}
            <DetailItem icon={<MapPin />} label="Bairro" value={patient.bairro} />
            <DetailItem icon={<MapPin />} label="Cidade" value={patient.cidade} />
            <DetailItem icon={<MapPin />} label="Estado" value={patient.estado} />
          </div>
        </div>

        <div className="detail-card">
          <h3 className="detail-section-title">Informações de Saúde (Resumo)</h3>
          <div className="detail-grid">
            <DetailItem icon={<SyringeIcon />} label="Última Vacina (Resumo)" value={patient.lastVaccineSummary} /> 
            <DetailItem icon={<CalendarDays />} label="Próximo Agendamento (Resumo)" value={patient.nextAppointmentSummary} />
          </div>
           <div className="detail-grid detail-grid-single-col" style={{marginTop: '1rem'}}>
            <DetailItem icon={<Stethoscope />} label="Observações Médicas / Alergias" value={patient.observacoesMedicas} />
          </div>
        </div>
        
        {/* SEÇÃO DE HISTÓRICO DE VACINAÇÃO COM BOTÃO FUNCIONAL */}
        <div className="detail-card">
          <div className="vaccination-history-header">
            <h3 className="detail-section-title">Histórico de Vacinação</h3>
            {/* Botão agora abre o modal */}
            <button className="btn btn-secondary btn-sm" onClick={handleOpenRegisterModal}>
              <PlusCircle size={16}/> Registrar Nova Vacinação
            </button>
          </div>
          {vaccinationHistory.length > 0 ? (
            <div className="table-container-condensed">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Vacina</th>
                    <th>Dose</th>
                    <th>Data Aplic.</th>
                    <th>Lote</th>
                    <th>Profissional</th>
                    <th>Unidade</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccinationHistory.map(v => (
                    <tr key={v.id}>
                      <td>{v.vaccineName}</td>
                      <td>{v.dose}</td>
                      <td>{v.dateApplied}</td>
                      <td>{v.batch}</td>
                      <td>{v.professional || '-'}</td>
                      <td>{v.unit || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-history-message">Nenhum histórico de vacinação registrado para este paciente.</p>
          )}
        </div>
      </section>

      {/* Renderiza o Modal de Registro de Vacinação */}
      <RegisterVaccinationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onSubmit={handleSubmitVaccinationRecord}
        patientName={patient.name}
        availableVaccines={availableVaccinesForSelection}
      />
    </>
  );
}