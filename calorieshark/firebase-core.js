/**
 * CalorieShark Firebase Foundation
 * Modular SDK v10 Integration
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Globalni objekat za pristup iz app_v36.js (dok ne refaktoriramo sve u module)
window.CS_Firebase = {
    auth,
    db,
    user: null,

    // Auth functions
    loginWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    },

    logout: () => signOut(auth),

    // Firestore functions
    saveUserData: async (uid, data) => {
        try {
            await setDoc(doc(db, "users", uid), data, { merge: true });
        } catch (error) {
            console.error("Firestore Save Error:", error);
        }
    },

    loadUserData: async (uid) => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data() : null;
        } catch (error) {
            console.error("Firestore Load Error:", error);
            return null;
        }
    }
};

// State listener
onAuthStateChanged(auth, (user) => {
    window.CS_Firebase.user = user;
    console.log("Firebase Auth State:", user ? "Logged In" : "Logged Out");

    // Obavijesti glavni app ako je potrebno
    if (window.onFirebaseStateChange) {
        window.onFirebaseStateChange(user);
    }
});

export { app, auth, db };
