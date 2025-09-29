// Firebase configuration - Debug mode
console.log('🔄 Starting Firebase initialization...');

const firebaseConfig = {
    apiKey: "AIzaSyAjLC_L4hV4V6jJMh-A-wKWSl9yGhUJ6Fo",
    authDomain: "register-2bd9f.firebaseapp.com",
    projectId: "register-2bd9f",
    storageBucket: "register-2bd9f.appspot.com",
    messagingSenderId: "350245966078",
    appId: "1:350245966078:web:390bf320cda2005e7c95af"
};

// Validate configuration
console.log('🔍 Validating Firebase configuration...');
const requiredFields = ['apiKey', 'authDomain', 'projectId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
    console.error('❌ Missing required Firebase configuration fields:', missingFields);
} else {
    console.log('✅ Firebase configuration is valid');
}

// Load Firebase modules dynamically
async function loadFirebaseModules() {
    try {
        console.log('🔄 Loading Firebase modules...');

        // Load Firebase modules from CDN
        const [{ initializeApp }, { getAuth }, { getFirestore }, { createUserWithEmailAndPassword, signInWithEmailAndPassword }, { doc, setDoc }] = await Promise.all([
            import("https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js"),
            import("https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js"),
            import("https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"),
            import("https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js"),
            import("https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js")
        ]);

        console.log('✅ Firebase modules loaded successfully');

        // Initialize Firebase
        console.log('🔄 Initializing Firebase app...');
        const app = initializeApp(firebaseConfig);
        console.log('✅ Firebase app initialized successfully');

        console.log('🔄 Initializing Firebase Auth...');
        const auth = getAuth(app);
        console.log('✅ Firebase Auth initialized successfully');

        console.log('🔄 Initializing Firestore...');
        const db = getFirestore(app);
        console.log('✅ Firestore initialized successfully');

        // Make Firebase available globally
        window.auth = auth;
        window.db = db;
        window.app = app;

        // Make functions available globally
        window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        window.signInWithEmailAndPassword = signInWithEmailAndPassword;
        window.doc = doc;
        window.setDoc = setDoc;

        console.log('✅ Firebase services made globally available');

        return { app, auth, db };

    } catch (error) {
        console.error('❌ Firebase modules failed to load:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        throw error;
    }
}

// Logout function
window.logoutUser = async function() {
    try {
        if (!window.auth) {
            throw new Error('Firebase authentication not available');
        }

        await window.auth.signOut();
        console.log('✅ User logged out successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Logout error:', error);
        return { success: false, error: error.message };
    }
};


// Initialize Firebase when module loads
let firebaseInitialized = false;

async function initializeFirebase() {
    if (firebaseInitialized) {
        console.log('✅ Firebase already initialized');
        return;
    }

    try {
        await loadFirebaseModules();
        firebaseInitialized = true;
        console.log('✅ Firebase initialization completed');

        // Dispatch Firebase ready event
        window.dispatchEvent(new Event('firebase-ready'));
        console.log('🎉 Firebase ready event dispatched');

    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
        firebaseInitialized = false;
    }
}

// Initialize immediately
initializeFirebase();

// Show message function
function showMessage(message, elementId) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = elementId.includes('error') ? 'red' : 'green';
    }
}

// Signup function
window.signupUser = async function(email, password) {
    try {
        console.log('🔄 Creating user account...');

        if (!window.auth || !window.createUserWithEmailAndPassword) {
            throw new Error('Firebase authentication not available');
        }

        const userCredential = await window.createUserWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;

        console.log('✅ User created successfully:', user.uid);

        // Save user data to Firestore
        const userData = {
            email: email,
            uid: user.uid,
            createdAt: new Date().toISOString(),
            userType: 'tenant'
        };

        const docRef = window.doc(window.db, "users", user.uid);
        await window.setDoc(docRef, userData);

        console.log('✅ User data saved to Firestore');

        return {
            success: true,
            user: user
        };

    } catch (error) {
        console.error('❌ Signup error:', error);

        let errorMessage = 'Unable to create user account';

        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email address is already in use';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

// Login function
window.loginUser = async function(email, password) {
    try {
        console.log('🔄 Signing in user...');

        if (!window.auth || !window.signInWithEmailAndPassword) {
            throw new Error('Firebase authentication not available');
        }

        const userCredential = await window.signInWithEmailAndPassword(window.auth, email, password);
        const user = userCredential.user;

        console.log('✅ User signed in successfully:', user.uid);

        return {
            success: true,
            user: user
        };

    } catch (error) {
        console.error('❌ Login error:', error);

        let errorMessage = 'Unable to sign in';

        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

// Check if user is authenticated
window.checkAuthState = function() {
    return new Promise((resolve) => {
        if (!window.auth) {
            console.log('❌ Auth not available');
            resolve({ authenticated: false, user: null });
            return;
        }

        window.auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('✅ User is authenticated:', user.uid);
                resolve({ authenticated: true, user: user });
            } else {
                console.log('❌ No authenticated user');
                resolve({ authenticated: false, user: null });
            }
        });
    });
};

// Logout function
window.logoutUser = async function() {
    try {
        if (!window.auth) {
            throw new Error('Firebase authentication not available');
        }

        await window.auth.signOut();
        console.log('✅ User logged out successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Logout error:', error);
        return { success: false, error: error.message };
    }
};

console.log('🔥 Firebase authentication module loaded successfully');
