import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  useEffect(() => {
    console.log('HomeScreen montado');
    return () => {
      console.log('HomeScreen desmontado');
    };
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="home-heart" size={40} color="#6366F1" />
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>ao Meu Primeiro App</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Details')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, styles.iconContainer1]}>
            <MaterialCommunityIcons name="information-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Detalhes</Text>
          <Text style={styles.cardDescription}>Explore mais informações sobre a aplicação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('List')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, styles.iconContainer2]}>
            <MaterialCommunityIcons name="account-multiple" size={32} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Cadastros</Text>
          <Text style={styles.cardDescription}>Visualize todos os usuários registrados</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="lock-check" size={24} color="#6366F1" />
          <Text style={styles.featureText}>Segurança de dados</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="cloud-sync" size={24} color="#6366F1" />
          <Text style={styles.featureText}>Sincronização em tempo real</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialCommunityIcons name="mobile-outline" size={24} color="#6366F1" />
          <Text style={styles.featureText}>Interface intuitiva</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer1: {
    backgroundColor: '#818CF8',
  },
  iconContainer2: {
    backgroundColor: '#06B6D4',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  featureContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 12,
    fontWeight: '600',
  },
});