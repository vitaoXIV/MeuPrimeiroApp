import React, { createContext, useState, useEffect, useContext, use } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

//criando o tipo de contexto

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

//criando o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//criando o provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  //persistência do usuário logado no app, para não precisar logar toda vez que abrir o app

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userLogged) => {
      setUser(userLogged);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //funçao de login
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  //funçao de logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//hook para usar o contexto de autenticação
export function useAuth () {
  return useContext(AuthContext);
}