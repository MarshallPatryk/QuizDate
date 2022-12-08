import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "key",
  authDomain: "test.firebaseapp.com",
  databaseURL: "https://test.firebaseio.com",
  projectId: "test",
  storageBucket: "test.appspot.com",
  messagingSenderId: "1234",
  appId: "appID"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };