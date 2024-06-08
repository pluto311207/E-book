import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
document.addEventListener("DOMContentLoaded", () => {
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("displayName");
  };
  onAuthStateChanged(auth, (user) => {
    const inforElement = document.getElementById("container__user");
    const displayName = localStorage.getItem("displayName");
         
    if (user) {
      const displayName = user.displayName || "User";
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
      const jsbtn = document.getElementsByClassName("js-btn");
      for(let i = 0; i < jsbtn.length;i++)
        {
          jsbtn[i].style.display = "block";
        }
      console.log(jsbtn);
    } else if (displayName) {
      inforElement.innerHTML = `
                <div>
                    <span class='hello'>Hello, </span>
                    <span id="displayName">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
            const jsbtn = document.getElementsByClassName("js-btn");
      for(let i = 0; i < jsbtn.length;i++)
        {
          jsbtn[i].style.display = "block";
        }
    } else {
      inforElement.innerHTML = `
            <div class='signin'>
                <a href="./pages/signIn.html">Sign in</a>
            </div>
        `;
      // let JSBTN = document.getElementsByClassName("js-btn");
      // // for(let i = 0; i < JSBTN.length; i++)
      // //   {
      // //     JSBTN[i].style.display = 'none';
      // //   }
      // JSBTN.style.display = "none";
    }
  });
});

