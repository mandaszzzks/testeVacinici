import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// ÍCONES FALTANTES ADICIONADOS AQUI: CheckCircle2, PackageSearch, AlertTriangle
import { 
  ArrowLeft, Edit, Package, Thermometer, Users2, Info, CalendarDays, Hash, Building, 
  Syringe as SyringeIcon, CheckCircle2, PackageSearch, AlertTriangle 
} from 'lucide-react';

// Dados de exemplo (idealmente viriam de um contexto, Redux, ou seriam buscados por uma API)
const vaccinesData = [
  { id: 'vac_001', name: 'Coronavac', type: 'Inativada', manufacturer: 'Sinovac', batch: 'L2024001', expiryDate: '31/12/2025', stock: 1500, status: 'Disponível', targetAudience: 'Adultos 18+', storageInfo: 'Refrigerada 2-8°C', notes: 'Dose padrão: 0.5ml' },
  { id: 'vac_002', name: 'Pfizer-BioNTech', type: 'RNA Mensageiro', manufacturer: 'Pfizer/BioNTech', batch: 'PZ2024B05', expiryDate: '30/11/2025', stock: 250, status: 'Baixo Estoque', targetAudience: 'Adultos e Adolescentes 12+', storageInfo: 'Ultracongelada -70°C', notes: 'Requer diluição' },
  { id: 'vac_003', name: 'AstraZeneca', type: 'Vetor Viral', manufacturer: 'Oxford/AstraZeneca', batch: 'AZ2023C12', expiryDate: '31/05/2025', stock: 0, status: 'Vencida', targetAudience: 'Adultos 18+', storageInfo: 'Refrigerada 2-8°C', notes: 'Intervalo de 12 semanas entre doses' },
  { id: 'vac_004', name: 'Janssen', type: 'Vetor Viral', manufacturer: 'Johnson & Johnson', batch: 'JJ2024D08', expiryDate: '28/02/2026', stock: 800, status: 'Disponível', targetAudience: 'Adultos 18+', storageInfo: 'Refrigerada 2-8°C', notes: 'Dose única' },
  { id: 'vac_005', name: 'Sputnik V', type: 'Vetor Viral', manufacturer: 'Gamaleya', batch: 'SP2024E03', expiryDate: '31/07/2025', stock: 45, status: 'Baixo Estoque', targetAudience: 'Adultos 18+', storageInfo: 'Congelada -18°C', notes: 'Componentes diferentes para dose 1 e 2' },
];


// Componente para exibir um item de detalhe
const DetailItem = ({ icon, label, value, className = '' }) => (
  <div className={`detail-item ${className}`}>
    {icon && React.cloneElement(icon, { size: 18, className: 'detail-item-icon' })}
    <div className="detail-item-content">
      <span className="detail-item-label">{label}</span>
      <span className="detail-item-value">{value || 'Não informado'}</span>
    </div>
  </div>
);


export default function VaccineDetailPage() {
  const { vaccineId } = useParams();
  const navigate = useNavigate();
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundVaccine = vaccinesData.find(v => v.id === vaccineId);
    setTimeout(() => { 
      setVaccine(foundVaccine);
      setLoading(false);
    }, 300); // Reduzido o delay para teste
  }, [vaccineId]);

  if (loading) {
    return <div className="loading-state">Carregando detalhes da vacina...</div>;
  }

  if (!vaccine) {
    return (
      <div className="not-found-state">
        <AlertTriangle size={48} className="not-found-icon" /> {/* Usando AlertTriangle importado */}
        <h2>Vacina não encontrada</h2>
        <p>A vacina com o ID "{vaccineId}" não foi encontrada no sistema.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/vaccines')}>
          <ArrowLeft size={18} /> Voltar para Lista de Vacinas
        </button>
      </div>
    );
  }

  // Função para pegar o ícone de status correto (pode ser movida para um utilitário)
  const getStatusDisplayIcon = (status) => {
    if (status === 'Disponível') {
      return <CheckCircle2 size={18} className="detail-item-icon status-disponivel" />;
    } else if (status === 'Baixo Estoque') {
      return <PackageSearch size={18} className="detail-item-icon status-baixo-estoque" />;
    } else if (status === 'Vencida') {
      return <AlertTriangle size={18} className="detail-item-icon status-vencida" />;
    }
    return <Info size={18} className="detail-item-icon" />; // Ícone padrão
  };


  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title page-detail-title">
            <SyringeIcon size={30} className="title-icon" /> Detalhes da Vacina: {vaccine.name}
          </h2>
          <p className="content-subtitle">Informações completas sobre a vacina selecionada.</p>
        </div>
        <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/admin/vaccines')}>
                <ArrowLeft size={18} /> Voltar para Lista
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/admin/vaccines/edit/${vaccine.id}`)}>
                <Edit size={18} /> Editar Vacina
            </button>
        </div>
      </header>

      <section className="vaccine-detail-content">
        <div className="detail-card">
          <h3 className="detail-section-title">Informações Gerais</h3>
          <div className="detail-grid">
            <DetailItem icon={<SyringeIcon />} label="Nome da Vacina" value={vaccine.name} />
            <DetailItem icon={<Info />} label="Tipo" value={vaccine.type} />
            <DetailItem icon={<Building />} label="Fabricante" value={vaccine.manufacturer} />
            <DetailItem icon={<Hash />} label="Lote Principal" value={vaccine.batch} />
          </div>
        </div>

        <div className="detail-card">
          <h3 className="detail-section-title">Estoque e Validade</h3>
          <div className="detail-grid">
            <DetailItem icon={<Package />} label="Quantidade em Estoque (Doses/Frascos)" value={vaccine.stock} />
            <DetailItem icon={<CalendarDays />} label="Data de Validade (Lote Principal)" value={vaccine.expiryDate} />
            <DetailItem 
              icon={getStatusDisplayIcon(vaccine.status)} // Usando a função para pegar o ícone correto
              label="Status Atual" 
              value={<span className={`badge badge-status-${vaccine.status.toLowerCase().replace(' ', '-')}`}>{vaccine.status}</span>} 
              className="status-detail-item"
            />
          </div>
        </div>
        
        <div className="detail-card">
          <h3 className="detail-section-title">Informações Adicionais</h3>
          <div className="detail-grid detail-grid-single-col">
            <DetailItem icon={<Users2 />} label="Público Alvo" value={vaccine.targetAudience} />
            <DetailItem icon={<Thermometer />} label="Instruções de Armazenamento" value={vaccine.storageInfo} />
            <DetailItem icon={<Info />} label="Observações" value={vaccine.notes} />
          </div>
        </div>
      </section>
    </>
  );
}