// src/pages/UserManagementPage.jsx
import React, { useState, useMemo } from 'react'; // ADICIONADO useMemo
import { useNavigate, Link } from 'react-router-dom';
// ADICIONADO ArrowUp, ArrowDown para indicadores de ordenação
import { Edit, Trash2, PlusCircle, Search, UserX, ArrowUp, ArrowDown } from 'lucide-react';
import ConfirmationModal from '../components/shared/ConfirmationModal';

const initialUsersData = [
  { id: 'usr_001', name: 'Ana Beatriz Costa', email: 'anabeatriz.costa@example.com', role: 'Administrador', lastActive: '01 Jun, 2025 - 14:30', dateAdded: '15 Jan, 2025', avatar: 'https://via.placeholder.com/40/A0D2DB/3A3D3A?text=AB', phone: '(11) 98765-4321', status: 'Ativo' },
  { id: 'usr_002', name: 'Carlos Eduardo Lima', email: 'carlos.lima@example.com', role: 'Enfermeiro(a)', lastActive: '30 Mai, 2025 - 09:15', dateAdded: '02 Fev, 2025', avatar: 'https://via.placeholder.com/40/F4B393/3A3D3A?text=CL', phone: '(21) 91234-5678', status: 'Ativo' },
  { id: 'usr_003', name: 'Mariana Silva Oliveira', email: 'mariana.oliveira@example.com', role: 'Recepcionista', lastActive: '01 Jun, 2025 - 10:05', dateAdded: '10 Mar, 2025', avatar: 'https://via.placeholder.com/40/C7CEEA/3A3D3A?text=MS', phone: '(31) 99999-8888', status: 'Inativo' },
  { id: 'usr_004', name: 'Bruno Alves Pereira', email: 'bruno.alves@example.com', role: 'Enfermeiro(a)', lastActive: '28 Mai, 2025 - 17:00', dateAdded: '20 Jan, 2025', avatar: 'https://via.placeholder.com/40/82E0AA/FFFFFF?text=BP', phone: '(41) 98888-7777', status: 'Ativo' },
  { id: 'usr_005', name: 'Zelia Cardoso Dias', email: 'zelia.cardoso@example.com', role: 'Administrador', lastActive: '02 Jun, 2025 - 08:00', dateAdded: '05 Jan, 2025', avatar: 'https://via.placeholder.com/40/D2B4DE/FFFFFF?text=ZD', phone: '(51) 97777-6666', status: 'Ativo' },
];

export default function UserManagementPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Estados para Filtro e Ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' }); // Ordenação inicial por nome

  const handleAddUser = () => navigate('/admin/users/new');
  const handleEditUser = (userId) => navigate(`/admin/users/edit/${userId}`);
  const requestDeleteUser = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };
  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
    }
    setIsModalOpen(false);
    setUserToDelete(null);
  };
  const cancelDeleteUser = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Lógica de Filtragem
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Lógica de Ordenação
  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        // Tratamento para diferentes tipos de dados pode ser adicionado aqui
        // Por enquanto, tratando tudo como string para simplificar
        const valA = String(a[sortConfig.key]).toLowerCase();
        const valB = String(b[sortConfig.key]).toLowerCase();

        if (valA < valB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

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
    return null; // Ou um ícone neutro como ChevronsUpDown
  };

  return (
    <>
      <header className="main-content-header">
        <div>
          <h2 className="content-title">Gerenciamento de Usuários</h2>
          <p className="content-subtitle">Adicione, edite ou visualize os usuários do sistema.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>
          <PlusCircle size={18} />
          Adicionar Usuário
        </button>
      </header>

      <div className="table-controls">
        <div className="search-input-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar usuário por nome ou email..." 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="user-list-section">
        <div className="table-container">
          <table className="custom-table sortable-table"> {/* Adicionada classe sortable-table */}
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Nome {getSortIcon('name')}
                </th>
                <th onClick={() => requestSort('role')}>
                  Função/Acesso {getSortIcon('role')}
                </th>
                <th onClick={() => requestSort('lastActive')}>
                  Último Acesso {getSortIcon('lastActive')}
                </th>
                <th onClick={() => requestSort('dateAdded')}>
                  Data de Adição {getSortIcon('dateAdded')}
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => ( // Mapeando sobre sortedUsers
                <tr key={user.id}>
                  <td>
                    <div className="user-info-cell">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div>
                        <Link to={`/admin/users/detail/${user.id}`} className="table-link user-name-link">
                          {user.name}
                        </Link>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-role-${user.role.toLowerCase().replace('(', '').replace(')', '')}`}> 
                      {user.role}
                    </span>
                  </td>
                  <td>{user.lastActive}</td>
                  <td>{user.dateAdded}</td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="btn-icon btn-edit" 
                        title="Editar Usuário"
                        onClick={() => handleEditUser(user.id)} 
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Remover Usuário"
                        onClick={() => requestDeleteUser(user)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedUsers.length === 0 && searchTerm && (
            <p className="no-results-message">Nenhum usuário encontrado para "{searchTerm}".</p>
          )}
        </div>
      </section>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDeleteUser}
        onConfirm={confirmDeleteUser}
        title="Confirmar Exclusão de Usuário"
        message={`Você tem certeza que deseja excluir o usuário "${userToDelete?.name}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir Usuário"
        cancelText="Cancelar"
        icon={<UserX />}
        isDestructive={true}
      />
    </>
  );
}