import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzCWLZEBwZM-VFWEnUgMK_ueeP1dyjQ-I",
  authDomain: "phone-auth-voter-login.firebaseapp.com",
  projectId: "phone-auth-voter-login",
  storageBucket: "phone-auth-voter-login.appspot.com",
  messagingSenderId: "818601575283",
  appId: "1:818601575283:web:7f0e6cb9dbdd8718c7fb06"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;