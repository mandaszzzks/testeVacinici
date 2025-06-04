import './UserManagement.css';

export default function UserManagement() {
  const users = [
    {
      name: 'Admjsx',
      email: 'admjsx@example.com',
      access: ['Admin', 'Data Export', 'Data Import'],
      lastActive: 'Apr 20, 2025',
      dateAdded: 'Jan 1, 2025',
    },
    {
      name: 'AdmCss',
      email: 'admcss@example.com',
      access: ['Data Export', 'Data Import'],
      lastActive: 'Apr 18, 2025',
      dateAdded: 'Jan 3, 2025',
    },
  ];

  return (
    <div className="user-management-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Configuração de Usuário</h2>
        <nav className="menu">
          <ul>
            <li className="active">Gerenciamento</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="header">
          <h1>Gerenciamento dos Usuários</h1>
          <button className="add-user-btn">+ Adicionar</button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Acesso</th>
              <th>Último acesso</th>
              <th>Adicionado </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <strong>{user.name}</strong><br />
                  <span className="email">{user.email}</span>
                </td>
                <td>
                  {user.access.map((role, index) => (
                    <span key={index} className={`badge ${role.toLowerCase().replace(' ', '-')}`}>
                      {role}
                    </span>
                  ))}
                </td>
                <td>{user.lastActive}</td>
                <td>{user.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
