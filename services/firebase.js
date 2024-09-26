const { initializeApp } = require("firebase/app");
const { getFirestore, collection, onSnapshot } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCQdQBBEV7F0cHmdFFZRcthfCGzw34bM_c",
  authDomain: "xeverse-bots.firebaseapp.com",
  projectId: "xeverse-bots",
  storageBucket: "xeverse-bots.appspot.com",
  messagingSenderId: "654120068612",
  appId: "1:654120068612:web:641336c476636fa26bf751",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, app };
