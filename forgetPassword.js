import { getAuth, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

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

let fpForm = document.getElementById("FP-form");

fpForm.addEventListener("submit", function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("Reset password email sent!");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
})