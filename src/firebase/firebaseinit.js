import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Permet la connexion à la BDD firebase

const firebaseConfig = {
    apiKey: "AIzaSyBCfGwPaBjXTC608zcROC8rCJtiYfijTjI",
    authDomain: "weatherdataforecast.firebaseapp.com",
    projectId: "weatherdataforecast",
    storageBucket: "weatherdataforecast.appspot.com",
    messagingSenderId: "576586583175",
    appId: "1:576586583175:web:dd5e6d83cd442acdc3bc22"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore(); 