// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Reemplaza estos valores con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeKxMrhJ6Vv-m7Z5uEebSSXGMEn3fF2Rk",
    authDomain: "sail-it.firebaseapp.com",
    projectId: "sail-it",
    storageBucket: "sail-it.firebasestorage.app",
    messagingSenderId: "521943361053",
    appId: "1:521943361053:web:42cfe89331ab978f22c8f4",
    measurementId: "G-6VES6YM7TB"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics
const analytics = getAnalytics(app);

export { analytics }; 