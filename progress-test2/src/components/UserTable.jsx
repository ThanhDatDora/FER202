import React, { useState } from 'react';
import { Table, Button, Image, Modal } from 'react-bootstrap';
import { updateUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext.jsx';

const UserTable = ({ users, onUserUpdated }) => {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleView = (user) => {
    setSelected(user);
    setShowModal(true);
  };

  const handleConfirmBan = (user) => {
    setConfirmUser(user);
    setShowConfirm(true);
  };

  const handleBan = async () => {
    if (!confirmUser) return;
    // Toggle behavior: if blocked => set active, otherwise set blocked
    const newStatus = (confirmUser.status && confirmUser.status.toLowerCase() === 'blocked') ? 'active' : 'blocked';
    const updated = { ...confirmUser, status: newStatus };
    try {
      const res = await updateUser(confirmUser.id, updated);
      onUserUpdated(res);
      setShowConfirm(false);
      setConfirmUser(null);
    } catch (err) {
      console.error('Failed to update user status', err);
      alert('Failed to update user: ' + (err.message || err));
    }
  };

  const { user: currentUser } = useAuth();

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td style={{ width: 80 }}>
                <Image src={u.avatar} roundedCircle width={40} height={40} alt="avatar" />
              </td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button size="sm" variant="info" onClick={() => handleView(u)}>View Details</Button>
                  <Button
                    size="sm"
                    variant={u.status === 'blocked' ? 'success' : 'danger'}
                    onClick={() => handleConfirmBan(u)}
                    disabled={currentUser && String(currentUser.id) === String(u.id)}
                    title={currentUser && String(currentUser.id) === String(u.id) ? 'You cannot change your own account status' : ''}
                  >
                    {u.status === 'blocked' ? 'Unban' : 'Ban Account'}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <div>
              <p><strong>ID:</strong> {selected.id}</p>
              <p><strong>Username:</strong> {selected.username}</p>
              <p><strong>Full name:</strong> {selected.fullName}</p>
              <p><strong>Role:</strong> {selected.role}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              <Image src={selected.avatar} roundedCircle width={80} height={80} alt="avatar" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmUser && (
            <p>Are you sure you want to {confirmUser.status === 'blocked' ? 'unban' : 'ban'} account <strong>{confirmUser.username}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleBan}>{confirmUser && confirmUser.status === 'blocked' ? 'Unban' : 'Ban'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
