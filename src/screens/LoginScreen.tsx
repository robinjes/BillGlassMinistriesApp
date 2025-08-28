import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { loginStyles } from '../styles/LoginStyle';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Implement actual authentication logic here
    // For now, we'll simulate a login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home screen after successful login
      navigation.navigate('Home');
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented here');
  };

  return (
    <SafeAreaView style={loginStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.keyboardView}
      >
        <View style={loginStyles.content}>
          {/* Header */}
          <View style={loginStyles.header}>
            <View style={loginStyles.logoContainer}>
              <View style={loginStyles.logoGraphic}>
                <View style={loginStyles.logoBar} />
                <View style={loginStyles.logoBarLight} />
                <View style={loginStyles.logoBar} />
              </View>
              <View style={loginStyles.logoTextContainer}>
                <Text style={loginStyles.logoSignature}>Bill Glass</Text>
                <Text style={loginStyles.logoMainText}>BEHIND</Text>
                <Text style={loginStyles.logoSubText}>THE WALLS</Text>
              </View>
            </View>
            <Text style={loginStyles.title}>Welcome Back</Text>
            <Text style={loginStyles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Form */}
          <View style={loginStyles.form}>
            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.label}>Email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.label}>Password</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity 
              style={loginStyles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={loginStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[loginStyles.loginButton, isLoading && loginStyles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={loginStyles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={loginStyles.footer}>
            <Text style={loginStyles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={loginStyles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
