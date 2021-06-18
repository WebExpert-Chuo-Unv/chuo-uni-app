import Vue from "vue";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRKfQatNySFHdmYfgZu3qEn3cyyN2yF7w",
  authDomain: "chuo-univ-app.firebaseapp.com",
  projectId: "chuo-univ-app",
  storageBucket: "chuo-univ-app.appspot.com",
  messagingSenderId: "627399301989",
  appId: "1:627399301989:web:2669703b003df6da719f8c",
  measurementId: "G-ZJL0HDJGY4",
};
firebase.initializeApp(firebaseConfig);
const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
};
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
});
firebase.auth().onAuthStateChanged((user) => {
  let state;
  if (user) {
    const { uid, displayName, photoURL } = user;
    state = {
      uid,
      displayName,
      photoURL,
    };
  } else {
    state = initialUserState;
  }
  Object.assign($auth.currentUser, state);
});
Vue.prototype.$auth = $auth;
