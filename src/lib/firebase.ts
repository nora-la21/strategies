import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCOWb2egKAivgrHZoP2qGrc1_7qupiAkk",
  authDomain: "strategies-25a78.firebaseapp.com",
  projectId: "strategies-25a78",
  storageBucket: "strategies-25a78.firebasestorage.app",
  messagingSenderId: "448363707143",
  appId: "1:448363707143:web:b7e5e37419294d8e4423a2",
  measurementId: "G-LC3TFRF6V0",
};

// Prevent re-initialization during Next.js hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
