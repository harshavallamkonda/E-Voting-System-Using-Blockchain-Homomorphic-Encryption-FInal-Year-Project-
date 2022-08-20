import { initializeApp } from "firebase/app";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	doc,
	getFirestore,
	collection,
	addDoc,
	collectionGroup,
	query,
	where,
	getDoc,
	setDoc,
	getDocs,
	onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCzCWLZEBwZM-VFWEnUgMK_ueeP1dyjQ-I",
	authDomain: "phone-auth-voter-login.firebaseapp.com",
	projectId: "phone-auth-voter-login",
	storageBucket: "phone-auth-voter-login.appspot.com",
	messagingSenderId: "818601575283",
	appId: "1:818601575283:web:7f0e6cb9dbdd8718c7fb06",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
	doc,
	RecaptchaVerifier,
	auth,
	db,
	collection,
	collectionGroup,
	query,
	where,
	getDoc,
	setDoc,
	getDocs,
	addDoc,
	signInWithEmailAndPassword,
	signOut,
	onSnapshot,
};
