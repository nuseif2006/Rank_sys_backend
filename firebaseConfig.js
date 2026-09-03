const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize using cert directly
initializeApp({
  credential: cert(serviceAccount)
});

const adminAuth = getAuth();

module.exports = { adminAuth };