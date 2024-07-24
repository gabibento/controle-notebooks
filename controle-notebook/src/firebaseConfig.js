// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApf5Htr-T92zy_IelB1tPT7pgAFBtmIBg",
  authDomain: "controle-notebook.firebaseapp.com",
  projectId: "controle-notebook",
  storageBucket: "controle-notebook.appspot.com",
  messagingSenderId: "580862655488",
  appId: "1:580862655488:web:df29043d061ef2134f2ce5",
  measurementId: "G-H112Y7QXNY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
