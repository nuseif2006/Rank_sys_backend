const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore")
const serviceAccount = require("./serviceAccountKey.json");

// Initialize using cert directly
initializeApp({
  credential: cert(serviceAccount)
});

const adminAuth = getAuth();
const db= getFirestore()

module.exports = { adminAuth, db };