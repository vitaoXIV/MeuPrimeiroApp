import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../config/FirebaseConfig';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { ActivityIndicator, View } from 'react-native';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar o estado de autenticação quando a aplicação inicia
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Estado de autenticação mudou:', currentUser?.email || 'usuário não autenticado');
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup: desinscrever quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  // Mostrar loading enquanto verifica o estado de autenticação
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const value = {
    user,
    loading,
    logout,
    isAuthenticated: user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
