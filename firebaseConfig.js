const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {getFirestore} = require("firebase-admin/firestore")
const serviceAccountRaw = process.env.SERVICE_ACCOUNT_KEY;

if (!serviceAccountRaw) {
  throw new Error("SERVICE_ACCOUNT_KEY environment variable is missing.");
}
const serviceAccount = JSON.parse(serviceAccountRaw);
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}
// Initialize using cert directly
initializeApp({
  credential: cert(serviceAccount)
});

const adminAuth = getAuth();
const db= getFirestore()

module.exports = { adminAuth, db };