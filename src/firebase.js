  import firebase from 'firebase';


  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyDmDw2YPTF6RLbvNoMnIBWfPbPgW_0i-18",
    authDomain: "instagram-clone-react-c5930.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-c5930.firebaseio.com",
    projectId: "instagram-clone-react-c5930",
    storageBucket: "instagram-clone-react-c5930.appspot.com",
    messagingSenderId: "454889122069",
    appId: "1:454889122069:web:201c6d419be06e201b611c",
    measurementId: "G-4XFWJP6JC8"
  })

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db, auth, storage};

  