import React from 'react';
import ReactDOM from 'react-dom';
import ExternalHomePage from './ExternalHomePage';
import './index.css'; // Import your custom styles here, if needed
import firebase from 'firebase/app'; // Import the core Firebase SDK
import 'firebase/auth'; // Import additional Firebase services if needed

// Replace this config with the one from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAW6xhxT_ycudLcNJL9OIt6Y5AAuzky-Po",
  authDomain: "taskbuddy-9c3f6.firebaseapp.com",
  projectId: "taskbuddy-9c3f6",
  // Add other configurations here (e.g., databaseURL, storageBucket, messagingSenderId, appId, etc.)
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <ExternalHomePage />
  </React.StrictMode>,
  document.getElementById('root')
);
