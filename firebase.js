import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyASvTLzptinp539DM1bfICotkoEbOv0tUM",
  authDomain: "rn-instagram-clone-7da08.firebaseapp.com",
  projectId: "rn-instagram-clone-7da08",
  storageBucket: "rn-instagram-clone-7da08.appspot.com",
  messagingSenderId: "69129109702",
  appId: "1:69129109702:web:a92927f1e6dfcc5b0817c7"
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
const db=firebase.firestore()
export {db,firebase};