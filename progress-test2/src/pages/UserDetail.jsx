import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import { Container, Card, Button, Image, Alert } from 'react-bootstrap';
import { getUserById, updateUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext.jsx';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError('Failed to load user');
      }
    };
    load();
  }, [id]);

  const { user: currentUser } = useAuth();

  const toggleStatus = async () => {
    if (!user) return;
    // Prevent current admin from banning themselves
    if (currentUser && String(currentUser.id) === String(user.id)) {
      setError('Bạn không thể khóa hoặc mở khóa chính tài khoản của mình.');
      return;
    }

    const newStatus = user.status && user.status.toLowerCase() === 'blocked' ? 'active' : 'blocked';
    try {
      const updated = await updateUser(user.id, { ...user, status: newStatus });
      setUser(updated);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container>
        <Card className="mt-4 p-3">
          <Button variant="link" onClick={() => navigate(-1)}>← Back</Button>
          <h4>User Details</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          {user ? (
            <div>
              <Image src={user.avatar} roundedCircle width={100} height={100} alt="avatar" />
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Full name:</strong> {user.fullName}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status}</p>
              <div style={{ marginTop: 12 }}>
                <Button variant={user.status === 'blocked' ? 'success' : 'danger'} onClick={toggleStatus}>
                  {user.status === 'blocked' ? 'Unban' : 'Ban Account'}
                </Button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserDetails;

