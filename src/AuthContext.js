import { createContext, useContext, useState, useEffect } from 'react';
import { projectAuth } from './firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setIsAuthenticated(user !== null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await projectAuth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = { isAuthenticated, setIsAuthenticated, handleLogout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
