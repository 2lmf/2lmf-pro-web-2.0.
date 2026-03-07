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

    saveHabits: async (uid, habits, metadata) => {
        try {
            await setDoc(doc(db, "zen_pauza", uid), {
                habits: habits,
                metadata: metadata,
                updatedAt: new Date().toISOString()
            });
            console.log("Firebase: Habits & Metadata saved");
        } catch (e) {
            console.error("Firebase: Save error", e);
        }
    },

    loadHabits: async (uid) => {
        try {
            const snap = await getDoc(doc(db, "zen_pauza", uid));
            if (snap.exists()) {
                return snap.data(); // Returns { habits, metadata }
            }
        } catch (e) {
            console.error("Firebase: Load error", e);
        }
        return null;
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
