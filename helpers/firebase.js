import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
/**
 * ! .env.local oluşturdum fakat oradaki değerleri buraya çekerken sıkıntı yapaşadım
 */

const config = {
  apiKey: "AIzaSyDmZwtWFTIUwrhFFNilmIkj8ufNVRJimAk",
  authDomain: "auth-development-47724.firebaseapp.com",
  projectId: "auth-development-47724",
  storageBucket: "auth-development-47724.appspot.com",
  messagingSenderId: "1024222452079",
  appId: "1024222452079:web:8e8df20b1432a78316309a"
};

const firebaseApp = firebase.apps && firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp(config)

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth()
export default firebaseApp



