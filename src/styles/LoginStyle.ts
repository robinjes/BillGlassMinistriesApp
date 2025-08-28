import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 20,
  },
  logoGraphic: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  logoBar: {
    width: 8,
    height: 40,
    backgroundColor: '#1e3a5f',
    borderRadius: 2,
  },
  logoBarLight: {
    width: 8,
    height: 50,
    backgroundColor: '#4a90e2',
    borderRadius: 2,
  },
  logoTextContainer: {
    alignItems: 'flex-start',
  },
  logoSignature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f7b731',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  logoMainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    letterSpacing: 1,
  },
  logoSubText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a5f',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#1e3a5f',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#1e3a5f',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#1e3a5f',
    fontSize: 14,
    fontWeight: '600',
  },
});
