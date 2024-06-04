// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6lOOfl5vPe29nOEdHXHuNB-QPeUsP6-Y",
  authDomain: "daysouq-301d1.firebaseapp.com",
  projectId: "daysouq-301d1",
  storageBucket: "daysouq-301d1.appspot.com",
  messagingSenderId: "303515155721",
  appId: "1:303515155721:web:feeab1bced2027fd5727d8",
  measurementId: "G-DV0NCB7TBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Variable to hold messaging instance
let messaging = null;

// Check if messaging is supported in the current browser
const initMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.error("This browser doesn't support Firebase Messaging.");
    }
  } catch (error) {
    console.error('Error while checking messaging support:', error);
  }
};

// Initialize messaging
initMessaging();

const generateToken = async () => {
  try {
    if (!messaging) {
      console.error('Firebase Messaging is not initialized');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      let token = await getToken(messaging, {
        vapidKey: "BBeeiUUAW0qLX0as9HFSHytxAsgYnSacbWV3N_XYKGQvnetCQNbVVJN6g0M8weZcZg7_SET1rXNmr3EukXpo-6I"
      });
      saveFCM(token);
    } else {
      console.error('Notification permission not granted');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
  }
};

const saveFCM = (token) => {
  localStorage.setItem("FCM-Token", token);
};

// Export messaging and generateToken for use in other parts of the application
export { messaging, generateToken, initMessaging };
