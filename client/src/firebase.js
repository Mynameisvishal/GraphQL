import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAED7c7Z3T69BVbNWpZZvd9dfLc0Ys7RW0",
  authDomain: "graphql-d56bb.firebaseapp.com",
  projectId: "graphql-d56bb",
  storageBucket: "graphql-d56bb.appspot.com",
  messagingSenderId: "889479312692",
  appId: "1:889479312692:web:154064dfc97bcfe2b0e161",
  measurementId: "G-LMS3K6YYN0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
