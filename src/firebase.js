import { initializeApp } from 'firebase/app';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const reauthenticate = (currentPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  return reauthenticateWithCredential(user, credential);
};

export const updateUserEmail = (newEmail) => {
  const user = auth.currentUser;
  return updateEmail(user, newEmail);
};

export const updateUserPassword = (newPassword) => {
  const user = auth.currentUser;
  return updatePassword(user, newPassword);
};

export default auth;
