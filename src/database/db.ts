import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDd7J4UDg9sTijO4ThtTH5zsfIMzP_npxg",
  authDomain: "group-travel-planner-5c204.firebaseapp.com",
  databaseURL: "https://group-travel-planner-5c204-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "group-travel-planner-5c204",
  storageBucket: "group-travel-planner-5c204.appspot.com",
  messagingSenderId: "748107405991",
  appId: "1:748107405991:web:e511754bff0db564cc1982",
  measurementId: "G-LGRFFMZZGW"
};

export const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const db = getFirestore(app);
