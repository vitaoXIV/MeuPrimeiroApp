import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

export default function ForgotPasswordScreen({ navigation }: any) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSendResetEmail = async () => {
		if (!email) {
			Alert.alert('Erro', 'Por favor, preencha o campo de email');
			return;
		}

		// Validação básica do email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			Alert.alert('Erro', 'Por favor, insira um email válido');
			return;
		}

		setLoading(true);

		try {
			console.log('Iniciando recuperação de senha para:', email);
			console.log('Auth config:', auth.app.options);
			
			await sendPasswordResetEmail(auth, email);
			
			console.log('✅ Email enviado com sucesso para:', email);
			Alert.alert(
				'✅ Sucesso!',
				'Link de redefinição de senha foi enviado para:\n\n' + email + '\n\nVerifique sua caixa de entrada e a pasta de SPAM.\n\nO link é válido por 1 hora.',
				[
					{
						text: 'OK',
						onPress: () => {
							setEmail('');
							navigation.navigate('Login');
						},
					},
				]
			);
		} catch (error: any) {
			console.error('❌ Erro ao enviar email:', error);
			console.error('Código do erro:', error?.code);
			console.error('Mensagem do erro:', error?.message);
			
			let message = 'Erro ao enviar link de redefinição';
			let titulo = 'Erro';

			if (error && error.code) {
				switch (error.code) {
					case 'auth/invalid-email':
						message = 'Email inválido ou não cadastrado no sistema';
						break;
					case 'auth/user-not-found':
						message = 'Nenhuma conta encontrada com esse email.\n\nCadastre-se primeiro!';
						break;
					case 'auth/too-many-requests':
						message = 'Muitas tentativas. Tente novamente em alguns minutos.';
						break;
					case 'auth/operation-not-allowed':
						message = 'Recuperação de senha não está habilitada.\nContate o administrador.';
						break;
					case 'auth/network-request-failed':
						message = 'Erro de conexão.\nVerifique sua internet e tente novamente.';
						break;
					default:
						message = error.message || message;
				}
			} else if (error && error.message) {
				message = error.message;
			}

			Alert.alert(titulo, message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
			>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
					<View style={styles.headerContainer}>
						<MaterialCommunityIcons name="lock-reset" size={56} color="#6366F1" />
						<Text style={styles.title}>Recuperar Senha</Text>
						<Text style={styles.subtitle}>
							Digite seu email para receber um link de redefinição
						</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Email</Text>
							<TextInput
								style={styles.input}
								placeholder="seu@email.com"
								placeholderTextColor="#9CA3AF"
								keyboardType="email-address"
								autoCapitalize="none"
								value={email}
								onChangeText={setEmail}
								editable={!loading}
							/>
						</View>

						<TouchableOpacity
							style={[styles.button, loading && styles.buttonDisabled]}
							onPress={handleSendResetEmail}
							disabled={loading}
						>
							{loading ? (
								<ActivityIndicator size="small" color="#FFFFFF" />
							) : (
								<>
									<MaterialCommunityIcons name="send" size={20} color="#FFFFFF" />
									<Text style={styles.buttonText}>Enviar link de redefinição</Text>
								</>
							)}
						</TouchableOpacity>
					</View>

					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>Lembrou sua senha?</Text>
						<TouchableOpacity onPress={() => navigation.navigate('Login')}>
							<Text style={styles.linkText}>Voltar ao Login</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	headerContainer: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#1F2937',
		marginTop: 16,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 14,
		color: '#6B7280',
		textAlign: 'center',
		marginTop: 8,
	},
	formContainer: {
		marginBottom: 30,
	},
	inputGroup: {
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#374151',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#F3F4F6',
		borderColor: '#D1D5DB',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		color: '#1F2937',
	},
	button: {
		backgroundColor: '#6366F1',
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 10,
		marginTop: 10,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
	footerContainer: {
		alignItems: 'center',
		marginTop: 30,
	},
	footerText: {
		fontSize: 14,
		color: '#6B7280',
		marginBottom: 8,
	},
	linkText: {
		fontSize: 14,
		color: '#6366F1',
		fontWeight: '600',
	},
});
