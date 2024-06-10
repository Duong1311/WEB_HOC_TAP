// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABi0iJQw7eORcWo-VCv38Sllj6cBfId-Q",
  authDomain: "datn-af11f.firebaseapp.com",
  projectId: "datn-af11f",
  storageBucket: "datn-af11f.appspot.com",
  messagingSenderId: "120276493531",
  appId: "1:120276493531:web:8577444eb4db299de698fe",
  measurementId: "G-LN42QG0W7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
module.exports = app;
// const analytics = getAnalytics(app);
