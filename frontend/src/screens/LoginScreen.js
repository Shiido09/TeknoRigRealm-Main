import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/screens/LoginScreenStyles';
import { login, setItem, googleLogin } from '../services/authService';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const data = await login({ email, password }); // Call the login function

      // Store token and user ID using SQLite
      await setItem('token', data.token);
      await setItem('userId', data._id);

      Alert.alert('Login Successful', 'Welcome back!');

      // Navigate based on user role
      if (data.isAdmin) {
        console.log(data.isAdmin)
        navigation.navigate('Admin'); 
      } else {
        navigation.navigate('Main'); 
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     setGoogleLoading(true);
      
  //     // Sign in with Google using React Native Google Sign In
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
      
  //     console.log('Google Sign-In Response:', JSON.stringify(userInfo));
      
  //     // FIXED: Access idToken from the correct location in the response
  //     const idToken = userInfo.idToken || (userInfo.data && userInfo.data.idToken);
  //     console.log('ID Token:', idToken);
      
  //     if (!idToken) {
  //       throw new Error("ID token not found in Google response");
  //     }
      
  //     // Send the ID token to your backend
  //     const data = await googleLogin(idToken);
      
  //     // Store token and user ID
  //     await setItem('token', data.token);
  //     await setItem('userId', data.user._id);
  
  //     Alert.alert('Login Successful', 'Welcome back!');
  
  //     // Navigate based on user role
  //     if (data.user.isAdmin) {
  //       navigation.navigate('Admin');
  //     } else {
  //       navigation.navigate('Main');
  //     }
  //   } catch (error) {
  //     // ...existing error handling...
  //   } finally {
  //     setGoogleLoading(false);
  //   }
  // };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      
      // Sign in with Google using React Native Google Sign In
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log('Google Sign-In Response:', JSON.stringify(userInfo));
      
      // Get the ID token
      const idToken = userInfo.idToken || (userInfo.data && userInfo.data.idToken);
      if (!idToken) {
        throw new Error("ID token not found in Google response");
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the Google credential
      const userCredential = await signInWithCredential(auth, googleCredential);
      //console.log("Firebase Auth User:", userCredential.user);
      
      // Get Firebase ID token to send to backend
      const firebaseToken = await userCredential.user.getIdToken();
      
      // Send the Firebase token to your backend
      const data = await googleLogin(firebaseToken);
      
      // Store token and user ID
      await setItem('token', data.token);
      await setItem('userId', data.user._id);
  
      Alert.alert('Login Successful', 'Welcome back!');
  
      // Navigate based on user role
      if (data.user.isAdmin) {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert(
        'Google Sign-In Failed', 
        error.message || 'An error occurred during Google sign-in'
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Login</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.loginButton,
                isLoading && { opacity: 0.7 }
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.orDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>
            
            {/* Google Login Button */}
            <TouchableOpacity 
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              disabled={googleLoading}
            >
              <View style={styles.googleIconContainer}>
                {googleLoading ? (
                  <ActivityIndicator size="small" color="#4285F4" />
                ) : (
                  <Text style={styles.googleIcon}>G</Text>
                )}
              </View>
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;