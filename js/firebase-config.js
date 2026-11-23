
/* =====================================
   FIREBASE - EJC GOIANA
===================================== */

// Inicialização do Firebase
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

// Autenticação dos administradores
import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Banco de dados dos eventos
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuração real do projeto EJC Goiana
const firebaseConfig = {
  apiKey: "AIzaSyDxdvRhmaBgkBuyC8hRaIT7o7D27guRd1o",
  authDomain: "ejc-goiana.firebaseapp.com",
  projectId: "ejc-goiana",
  storageBucket: "ejc-goiana.firebasestorage.app",
  messagingSenderId: "401794225671",
  appId: "1:401794225671:web:d59483ff20f2f1e56dfca2",
  measurementId: "G-5X5H8VWJZW"
};

// Inicializa o aplicativo
const app = initializeApp(firebaseConfig);

// Disponibiliza autenticação e banco de dados
export const auth = getAuth(app);
export const db = getFirestore(app);
