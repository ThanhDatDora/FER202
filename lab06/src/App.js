// src/App.js
import React, { useState } from 'react';
import UsersPage from './pages/UsersPage';
import PaymentsPage from './pages/PaymentsPage';

export default function App() {
  const [tab, setTab] = useState('users');
  return (
    <div style={{ padding: 20 }}>
      <h1>Redux Toolkit Demo</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setTab('users')} disabled={tab === 'users'}>Users</button>
        <button onClick={() => setTab('payments')} disabled={tab === 'payments'}>Payments</button>
      </div>
      {tab === 'users' ? <UsersPage /> : <PaymentsPage />}
    </div>
  );
}
