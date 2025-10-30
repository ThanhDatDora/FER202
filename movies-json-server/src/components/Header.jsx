import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" className="mb-4" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate('/movies')} style={{ cursor: 'pointer' }}>
          🎬 Movies Admin
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center gap-3">
          {user ? <span>Xin chào, {user.fullName} ({user.role})</span> : null}
          {user ? (
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
}
