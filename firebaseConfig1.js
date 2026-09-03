const { initializeApp } = require("firebase/app")
const { getAuth } = require("firebase/auth")

const firebaseConfig = {
  apiKey: "AIzaSyAkAOo5PnaGKIQA5U3uS9_7ap9JwMFV4hI",
  authDomain: "ranksystem-ba2f9.firebaseapp.com",
  projectId: "ranksystem-ba2f9",
  storageBucket: "ranksystem-ba2f9.firebasestorage.app",
  messagingSenderId: "287467230876",
  appId: "1:287467230876:web:c2ec24889217d60b04bf59"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

module.exports = {auth}