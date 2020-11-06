import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "../firebase-config";

firebase.initializeApp(config);

// auth
export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();

// firestore
export const db = firebase.firestore();
