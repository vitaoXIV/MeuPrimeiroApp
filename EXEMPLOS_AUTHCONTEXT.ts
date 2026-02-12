/**
 * EXEMPLOS DE USO DO AUTHCONTEXT
 * 
 * Este arquivo contém 10 exemplos práticos de como usar o AuthContext
 * em diferentes cenários da aplicação.
 * 
 * Cada exemplo está em um comentário de bloco para evitar conflitos.
 * Descomente e copie o exemplo que você quer usar.
 */

// ============================================
// EXEMPLO 1: Usar o contexto em uma tela
// ============================================
/*
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function MinhaTelaExemplo() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <View>
      <Text>Usuário: {user?.email}</Text>
      <Text>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</Text>
      
      <TouchableOpacity onPress={logout}>
        <Text>Fazer Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
*/


// ============================================
// EXEMPLO 2: Proteção de tela para usuários logados
// ============================================
/*
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function TelaPrivada() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <View>
        <Text>Acesso negado. Faça login primeiro.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Bem-vindo, {user?.email}!</Text>
    </View>
  );
}
*/


// ============================================
// EXEMPLO 3: Renderização condicional
// ============================================
/*
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function ComponenteCondicional() {
  const { isAuthenticated } = useAuth();

  return (
    <View>
      {isAuthenticated ? (
        <Text>Você está logado - mostra conteúdo protegido</Text>
      ) : (
        <Text>Você não está logado - mostra conteúdo público</Text>
      )}
    </View>
  );
}
*/


// ============================================
// EXEMPLO 4: Acessar dados do usuário
// ============================================
/*
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function PerfilUsuario() {
  const { user } = useAuth();

  if (!user) {
    return <Text>Nenhum usuário logado</Text>;
  }

  return (
    <View>
      <Text>Email: {user.email}</Text>
      <Text>UID: {user.uid}</Text>
      <Text>Criado em: {user.metadata?.creationTime}</Text>
      <Text>Último login: {user.metadata?.lastSignInTime}</Text>
    </View>
  );
}
*/


// ============================================
// EXEMPLO 5: Implementar botão de logout
// ============================================
/*
import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function BotaoLogout() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Sair da Conta</Text>
    </TouchableOpacity>
  );
}
*/


// ============================================
// EXEMPLO 6: Combinar com Firestore
// ============================================
/*
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export function CarregarDadosDoUsuario() {
  const { user } = useAuth();
  const [userData, setUserData] = React.useState<any>(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  return (
    <View>
      <Text>Email: {user?.email}</Text>
      <Text>Dados: {JSON.stringify(userData, null, 2)}</Text>
    </View>
  );
}
*/


// ============================================
// EXEMPLO 7: Lógica de navegação condicional
// ============================================
/*
import React from 'react';
import { useAuth } from '../context/AuthContext';

export function NavigacaoCondicional({ navigation }: any) {
  const { isAuthenticated } = useAuth();

  const handleNavegar = () => {
    if (isAuthenticated) {
      navigation.navigate('TelaProtegida');
    } else {
      navigation.navigate('Login');
    }
  };

  return null;
}
*/


// ============================================
// EXEMPLO 8: Componente wrapper protegido
// ============================================
/*
import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

interface ProtegidaPorProps {
  children: React.ReactNode;
}

export function ProtegidaPor({ children }: ProtegidaPorProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Você precisa estar autenticado para ver este conteúdo</Text>
      </View>
    );
  }

  return <>{children}</>;
}

// Uso:
function MinhaTelaComWrap() {
  return (
    <ProtegidaPor>
      <Text>Este conteúdo só é visível para usuários autenticados</Text>
    </ProtegidaPor>
  );
}
*/


// ============================================
// EXEMPLO 9: Usar em componentes de classe (HOC)
// ============================================
/*
import React from 'react';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

function withAuth(Component: any) {
  return (props: any) => {
    const auth = useAuth();
    return <Component {...props} auth={auth} />;
  };
}

class MinhaClasseComAuth extends React.Component<any> {
  render() {
    const { auth } = this.props;
    return <Text>Email: {auth.user?.email}</Text>;
  }
}

export default withAuth(MinhaClasseComAuth);
*/


// ============================================
// EXEMPLO 10: Screen completo com proteção
// ============================================
/*
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function ScreenCompletoExemplo({ navigation }: any) {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    setLocalLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.email}>Email: {user?.email}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
        disabled={localLoading}
      >
        <Text style={styles.buttonText}>
          {localLoading ? 'Desconectando...' : 'Desconectar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  email: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#ff0000', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
*/


// ============================================
// COMO USAR ESTE ARQUIVO:
// ============================================
/*
1. Cada exemplo está entre comentários /
 * ... * /
2. Descomente o exemplo que você quer usar
3. Copie o código para sua tela
4. Ajuste conforme necessário

EXEMPLOS DISPONÍVEIS:
- EXEMPLO 1: Uso básico do contexto
- EXEMPLO 2: Proteção de tela
- EXEMPLO 3: Renderização condicional
- EXEMPLO 4: Acessar dados do usuário
- EXEMPLO 5: Botão de logout
- EXEMPLO 6: Combinar com Firestore
- EXEMPLO 7: Navegação condicional
- EXEMPLO 8: Componente wrapper
- EXEMPLO 9: Componentes de classe
- EXEMPLO 10: Screen completo

PROBLEMAS RESOLVIDOS:
✅ Múltiplos imports removidos
✅ Múltiplos exports removidos
✅ Todos os exemplos comentados
✅ Sem conflitos de sintaxe
✅ Pronto para copiar e colar
*/

export {};
