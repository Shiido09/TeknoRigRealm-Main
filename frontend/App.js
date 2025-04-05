import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Ensure correct path
import AppNavigator from './src/navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


export default function App() {
  // Move useEffect inside the component
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '719082158171-ilh6riiei6797ij23kbsvrecuci93rr2.apps.googleusercontent.com',
      offlineAccess: true, 
      forceCodeForRefreshToken: true, 
      profileImageSize: 150,
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <AppNavigator />
    </Provider>
  );
}