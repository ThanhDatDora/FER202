import React, { useEffect, useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import * as api from '../services/api';
import { useAuth } from '../contexts/AuthContext.jsx';

const applyFilters = (users, filters) => {
  let list = [...users];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(u => u.username.toLowerCase().includes(q) || (u.fullName || '').toLowerCase().includes(q));
  }
  if (filters.role) {
    list = list.filter(u => u.role === filters.role);
  }
  if (filters.status) {
    list = list.filter(u => u.status === filters.status);
  }
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'username_asc': list.sort((a,b)=>a.username.localeCompare(b.username)); break;
      case 'username_desc': list.sort((a,b)=>b.username.localeCompare(a.username)); break;
      case 'status_asc': list.sort((a,b)=> (a.status||'').localeCompare(b.status||'')); break;
      case 'status_desc': list.sort((a,b)=> (b.status||'').localeCompare(a.status||'')); break;
      default: break;
    }
  }
  return list;
};

const UserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      }
    };
    load();
  }, []);

  const handleFiltersChange = (f) => {
    setFilters(f);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
  };

  // If the current user is not admin, show message
  if (!user) return null; // shouldn't happen because route is protected
  if (user.role !== 'admin') {
    return (
      <>
        <NavigationHeader />
        <Container>
          <Card className="mt-4 p-3">
            <Alert variant="danger">Bạn không có quyền truy cập trang User Management.</Alert>
          </Card>
        </Container>
      </>
    );
  }

  const visible = applyFilters(users, filters);

  return (
    <>
      <NavigationHeader />
      <Container>
        <h3 className="my-3">User Management</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card className="p-3 mb-3">
          <UserFilter filters={filters} onChange={handleFiltersChange} />
          <UserTable users={visible} onUserUpdated={handleUserUpdated} />
        </Card>
      </Container>
    </>
  );
};

export default UserList;

