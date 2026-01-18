import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password, rememberMe) => {
    // Dummy authentication - Replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials
        if (username === 'admin' && password === 'admin123') {
          const userData = {
            username: username,
            name: 'Admin User',
            role: 'Administrator',
          };
          
          if (rememberMe) {
            localStorage.setItem('adminUser', JSON.stringify(userData));
          } else {
            sessionStorage.setItem('adminUser', JSON.stringify(userData));
          }
          
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminUser');
    setUser(null);
  };

  const forgotPassword = (email) => {
    // Dummy forgot password - Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset link sent to your email' });
      }, 1000);
    });
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