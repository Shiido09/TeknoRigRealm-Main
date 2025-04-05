// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDztguS0izXLhaJ6M17AOFB2n1QE11HsFY',
//   authDomain: 'teknorigrealm-8f30d.firebaseapp.com',
//   projectId: 'teknorigrealm-8f30d',
//   storageBucket: 'teknorigrealm-8f30d.appspot.com',
//   messagingSenderId: '719082158171',
//   appId: '1:719082158171:web:d8449cbfe75b31bd0ae77e',
//   measurementId: 'G-0KGBZ8K06V',
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);


import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDztguS0izXLhaJ6M17AOFB2n1QE11HsFY',
  authDomain: 'teknorigrealm-8f30d.firebaseapp.com',
  projectId: 'teknorigrealm-8f30d',
  storageBucket: 'teknorigrealm-8f30d.appspot.com',
  messagingSenderId: '719082158171',
  appId: '1:719082158171:web:d8449cbfe75b31bd0ae77e',
  measurementId: 'G-0KGBZ8K06V',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();