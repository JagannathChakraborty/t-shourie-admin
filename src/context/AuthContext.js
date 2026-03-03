import React, { createContext, useState, useContext, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage or sessionStorage)
    const storedUser =
      localStorage.getItem('adminUser') ||
      sessionStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, rememberMe) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid username or password');
    }

    const userData = await response.json(); // { username, name, role }

    if (rememberMe) {
      localStorage.setItem('adminUser', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('adminUser', JSON.stringify(userData));
    }

    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminUser');
    setUser(null);
  };

  const forgotPassword = async (username) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send password reset email');
    }

    return data; // { message }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, forgotPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};