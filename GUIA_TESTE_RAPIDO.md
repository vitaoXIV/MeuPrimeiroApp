# 🚀 Guia Rápido de Teste - Controle de Sessão

## Como Testar as Implementações

### 📋 Pré-requisitos
- Firebase funcionando com contas de teste
- App compilado e rodando (Expo ou APK)
- Credenciais de teste disponíveis

---

## 1️⃣ Teste de Persistência de Sessão

### Objetivo
Verificar se o usuário permanece logado ao fechar e reabrir o app.

### Passos
```
1. Abra o app
   → Você vê a tela de Login (AuthStack)

2. Faça login com credenciais válidas
   → Um breve loading aparece
   → Redirecionado para HomeScreen (AppStack)
   ✅ Sucesso: Você está na tela privada

3. Feche o app completamente
   → Use o botão de home do dispositivo
   → Ou deslize para fechar (iOS)

4. Reabra o app (aguarde 2-3 segundos)
   → Um loading aparece
   → ✅ Sucesso: Você não volta para Login, continua em AppStack
   ❌ Falha: Se voltar para Login, verifique onAuthStateChanged
```

---

## 2️⃣ Teste de Logout

### Objetivo
Verificar se o logout funciona corretamente e encerra a sessão.

### Passos
```
1. Na tela HomeScreen (ou qualquer tela privada)
   → Procure o ícone de logout (🚪) no canto superior direito

2. Clique no ícone de logout vermelho
   → Um breve loading aparece
   → Firebase session é encerrada

3. ✅ Sucesso: Você é redirecionado para LoginScreen
   ❌ Falha: Se permanecer na tela privada, verifique logout() em AppStack.tsx
```

---

## 3️⃣ Teste de Proteção de Rotas

### Objetivo
Verificar que apenas usuários autenticados acessam telas privadas.

### Passos
```
1. Faça logout (veja teste anterior)
   → Você está na tela de Login

2. Tente clicar no botão "Voltar" (se disponível)
   → ✅ Sucesso: Não volta (está protegido)

3. Tente navegar para rotas privadas por deep linking
   → Na URL: expo://localhost/Details
   → ✅ Sucesso: Não consegue acessar, fica em Login
   ❌ Falha: Se conseguir, a lógica não está correta
```

---

## 4️⃣ Teste de Fluxo Público

### Objetivo
Verificar que as rotas públicas funcionam sem conta autenticada.

### Passos
```
1. Estando deslogado (na tela Login)

2. Clique em "Não tem conta? Cadastre-se aqui"
   → ✅ Sucesso: Vai para RegisterScreen (AuthStack)

3. De volta para Login, clique em "Esqueceu a senha?"
   → ✅ Sucesso: Vai para ForgotPasswordScreen (AuthStack)

4. Volte para Login
   → ✅ Sucesso: Consegue navegar entre telas públicas
```

---

## 5️⃣ Teste de Navegação Privada

### Objetivo
Verificar que todas as rotas privadas funcionam após autenticação.

### Passos
```
1. Faça login e visualize HomeScreen

2. Clique em "Ir para Detalhes"
   → ✅ Sucesso: Vai para DetailsScreen (AppStack)

3. Volte e clique em "Cadastro de Usuários"
   → ✅ Sucesso: Vai para RegisterScreen (AppStack)
   → Nota: Agora RegisterScreen está em AppStack, não em AuthStack

4. Volte e clique em "Ver Cadastrados"
   → ✅ Sucesso: Vai para ListScreen (AppStack)

5. Explore o header de cada tela
   → ✅ Sucesso: Botão de logout está presente
```

---

## 6️⃣ Teste de Console Logs

### Objetivo
Verificar que os logs confirmam o fluxo correto.

### Passos
```
1. Abra o console do Expo (Ctrl+Shift+M ou cmd+d)
   → Ou use: expo@latest submit para logs

2. Observe ao iniciar o app:
   ✅ "Estado de autenticação mudou: usuário não autenticado"

3. Faça login:
   ✅ "Login bem-sucedido para: seu@email.com"
   ✅ "Estado de autenticação mudou: seu@email.com"

4. Faça logout:
   ✅ "Logout realizado com sucesso"
   ✅ "Estado de autenticação mudou: usuário não autenticado"

5. Reabra o app:
   ✅ "Estado de autenticação mudou: usuário não autenticado"
   (se deslogado antes)
   ou
   ✅ "Estado de autenticação mudou: seu@email.com"
   (se ainda tinha sessão)
```

---

## 🧐 Verificação de Código

### AuthContext.tsx
```typescript
✅ onAuthStateChanged está implementado?
✅ Hook useAuth() está definido?
✅ Loading screen durante verificação?
✅ Função logout() faz signOut do Firebase?
```

### AppNavigator.tsx
```typescript
✅ Importa useAuth()?
✅ Verifica isAuthenticated?
✅ Retorna AppStack se autenticado?
✅ Retorna AuthStack se não autenticado?
```

### AppStack.tsx
```typescript
✅ Tem todas as rotas privadas?
✅ Botão de logout no header?
✅ Logout está funcional?
```

### AuthStack.tsx
```typescript
✅ Tem todas as rotas públicas?
✅ Login, Register, ForgotPassword?
✅ Sem botão de logout?
```

### App.tsx
```typescript
✅ AuthProvider envolve NavigationContainer?
✅ Import do AuthProvider?
```

### LoginScreen.tsx
```typescript
✅ Removida navegação manual (navigation.navigate)?
✅ BackHandler apenas retorna true?
✅ Login auréal ao terminar signIn?
```

---

## 🎯 Resultado Esperado

### ✅ Sucesso em Todos os Testes
- [x] Usuário permanece logado ao reabrir
- [x] Logout funciona e redireciona para Login
- [x] Telas privadas só acessíveis com autenticação
- [x] Telas públicas acessíveis sem autenticação
- [x] Navegação entre telas privadas funciona
- [x] Console logs indicam fluxo correto

### ❌ Possíveis Problemas e Soluções

| Problema | Possível Causa | Solução |
|----------|----------------|---------|
| Volta para login ao reabrir | onAuthStateChanged não funciona | Verificar FirebaseConfig.ts |
| Logout não funciona | logout() não implementado | Verificar APPSTACK.tsx |
| Acessar tela privada sem autenticação | AppNavigator não verifica isAuthenticated | Adicionar lógica condicional |
| Erro "useAuth deve ser usado" | AuthProvider não envolve App | Envolver NavigationContainer |
| Navegação congelada | Loading infinito | Verificar onAuthStateChanged termino |

---

## 📱 Testando em Dispositivo Real

1. Compilar para APK (Android) ou IPA (iOS)
2. Instalar no dispositivo
3. Desinstalar o app completamente
4. Reinstalar a nova versão
5. Executar os 6 testes acima
6. Verificar se o problema foi resolvido

---

## 💡 Dicas

- Use múltiplas contas para testar login/logout
- Limpe cache do Firebase localmente para forçar novo login
- Use Browser DevTools para simular app close
- Verifique Internet - sem internet, Firebase não consegue validar sessão
- Aumente o timeout em desenvolvimento se tiver lentidão

---

## 🔗 Referência Rápida

```
AuthContext.tsx → Gerencia estado de autenticação
    ↓
AppNavigator.tsx → Decide qual stack mostrar
    ├→ AppStack.tsx (se autenticado) → Rotas privadas
    └→ AuthStack.tsx (se não autenticado) → Rotas públicas
```

---

**Status Final:** ✅ Pronto para avaliação
