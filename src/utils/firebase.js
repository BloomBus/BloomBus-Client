import * as firebase from 'firebase';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'bloombus-163620.firebaseapp.com',
  databaseURL: 'https://bloombus-163620.firebaseio.com',
  projectId: 'bloombus-163620',
  storageBucket: 'bloombus-163620.appspot.com',
  messagingSenderId: '740651108770',
  appId: '1:740651108770:web:9b1a0ebb417c9e1f',
};
firebase.initializeApp(config);

export default firebase;
