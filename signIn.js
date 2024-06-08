import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// import {setDoc, doc,getFirestore} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAgueZSejSaXWmBUJqKCy9o7dYINOr-mSk",
  authDomain: "e-book-688b2.firebaseapp.com",
  databaseURL: "https://e-book-688b2-default-rtdb.firebaseio.com",
  projectId: "e-book-688b2",
  storageBucket: "e-book-688b2.appspot.com",
  messagingSenderId: "65983976082",
  appId: "1:65983976082:web:6512993d5dd15c4fe90c4b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let formSI = document.getElementById("SI-form");

formSI.addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('displayName', auth.currentUser.displayName);
      localStorage.setItem('userInfo', auth.currentUser.email)
      alert("Sign in successfully!");
      window.location.href = "./../index.html";
})


document.getElementById("showPass").addEventListener("click", () =>{
  const pass = document.getElementById("password");
  if(pass.type == 'password'){
    pass.type = 'text'
  }
  else{
    pass.type = 'password'
  }
})

const provider = new GoogleAuthProvider();

function signInWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...

    localStorage.setItem("userInfo", user.email);
    window.location.href = "./../index.html"
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
let signInGG = document.getElementById("signInGoogle");

signInGG.addEventListener("click", signInWithGoogle)

