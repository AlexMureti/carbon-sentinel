// src/services/firebase.js
// Firebase config and auth functions for Carbon Sentinel.
// Why? Central hub for setup—import in App for logins. Handles email/social without server code.

import { initializeApp } from 'firebase/app'; // initializeApp: Connects to your project using config keys.
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'; // getAuth: Auth service. signInWithEmailAndPassword: Email login. signInWithPopup: Social popup. Providers: Google/GitHub setup. onAuthStateChanged: Watches login changes. signOut: Logout.

const firebaseConfig = { // Paste your copied config here—apiKey, etc. (from console).
  apiKey: "AIzaSy...", // Example—replace with yours.
  authDomain: "carbon-sentinel.firebaseapp.com",
  projectId: "carbon-sentinel",
  storageBucket: "carbon-sentinel.appspot.com",
  messagingSenderId: "1069720577901",
  appId: "1:1069720577901:web:ddd85d5b5333927a891c64",
  measurementId: "G-792Z486NXS"
};

const app = initializeApp(firebaseConfig); // Creates app instance—your "link" to Firebase services.
const auth = getAuth(app); // Gets auth—handles all logins/tokens.

const googleProvider = new GoogleAuthProvider(); // Preps Google—popup with account choice.
const githubProvider = new GithubAuthProvider(); // Preps GitHub—popup with repo access if needed.

// Email login—async for await (waits for response).
export const signInEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password); // Await: Logs in, returns user if success.
    return result.user; // User object (email, uid)—App uses for state.
  } catch (error) {
    console.error('Email login error:', error.code); // Log code (e.g., 'auth/wrong-password').
    throw error; // Re-throw—App handles (e.g., alert).
  }
};

// Google login—popup.
export const signInGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider); // Popup: Opens Google, logs in, closes.
    return result.user;
  } catch (error) {
    console.error('Google error:', error);
    throw error;
  }
};

// GitHub login—popup.
export const signInGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    console.error('GitHub error:', error);
    throw error;
  }
};

// Auth listener—callback on login/logout.
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback); // Calls callback with user (null if out). Return unsubscribe for cleanup.
};

// Logout.
export const logout = () => signOut(auth); // Clears session—user to null.

export { auth }; // Export auth for checks (e.g., auth.currentUser).