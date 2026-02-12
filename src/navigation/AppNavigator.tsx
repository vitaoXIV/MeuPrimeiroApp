import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}