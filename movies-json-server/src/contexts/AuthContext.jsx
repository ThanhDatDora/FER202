import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3001/users', {
        params: { username, password }
      });
      const list = res.data || [];
      if (list.length === 0) {
        setError('Sai thông tin đăng nhập');
        return false;
      }
      const found = list[0];
      setUser(found);
      localStorage.setItem('auth_user', JSON.stringify(found));
      return true;
    } catch (e) {
      setError('Không thể đăng nhập');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value = { user, login, logout, loading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
