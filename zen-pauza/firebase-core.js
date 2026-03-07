/**
 * Zen Pauza Firebase Core
 * Modular SDK v10 Integration
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Global bridge for main app.js
window.ZP_Firebase = {
    auth,
    db,
    user: null,

    login: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Firebase Login Error:", error);
            throw error;
        }
    },

    logout: () => signOut(auth),

    saveHabits: async (uid, habits) => {
        try {
            await setDoc(doc(db, "zenpauza_users", uid), {
                habits: habits,
                lastSync: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error("Firebase Save Habits Error:", error);
        }
    },

    loadHabits: async (uid) => {
        try {
            const docRef = doc(db, "zenpauza_users", uid);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data().habits : null;
        } catch (error) {
            console.error("Firebase Load Habits Error:", error);
            return null;
        }
    }
};

// Listen for Auth changes
onAuthStateChanged(auth, (user) => {
    window.ZP_Firebase.user = user;
    if (window.onFirebaseStateChange) {
        window.onFirebaseStateChange(user);
    }
});

export { app, auth, db };
