
document.getElementById("showPass").addEventListener("click", () =>{
  const pass = document.getElementById("password");
  if(pass.type == 'password'){
    pass.type = 'text'
  }
  else{
    pass.type = 'password'
  }
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {setDoc, doc,getFirestore} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
const db = getFirestore(app);


let formSU = document.getElementById("SU-form")

const emailField = document.getElementById("email-field"), 
passField = document.getElementById("password-field"), 
cPassField = document.getElementById("cpassword-field");

const Email = document.getElementById("email");
const Password = document.getElementById("password");
const conPass = document.getElementById("conPassword");
function checkEmail() {
  const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!Email.value.match(emaiPattern)) {
    return emailField.classList.add("invalid"); //adding invalid class if email value do not mathced with email pattern
  }
  emailField.classList.remove("invalid"); //removing invalid class if email value matched with emaiPattern
}

function createPass() {
  const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!Password.value.match(passPattern)) {
    return passField.classList.add("invalid"); //adding invalid class if password input value do not match with passPattern
  }
  passField.classList.remove("invalid"); //removing invalid class if password input value matched with passPattern
}

function confirmPass() {
  if (Password.value !== conPass.value || conPass.value === "") {
    return cPassField.classList.add("invalid");
  }
  cPassField.classList.remove("invalid");
}

formSU.addEventListener("submit", async(event)=>{
  event.preventDefault();
  checkEmail();
  createPass();
  confirmPass();

  Email.addEventListener("keyup", checkEmail);
  Password.addEventListener("keyup", createPass);
  conPass.addEventListener("keyup", confirmPass);

 
  if(conPass.value === Password.value && Email.value != "" && Password.value != "" && conPass.value != "" && !emailField.classList.contains("invalid") && !passField.classList.contains("invalid") && !cPassField.classList.contains("invalid"))
    {
      if(Password.value.length >= 8)
      {
        createUserWithEmailAndPassword(auth, Email.value, Password.value);
        const FirstName = document.getElementById("First_Name").value;
        const LastName = document.getElementById("Last_Name").value;
        updateProfile(auth.currentUser, {
          displayName: FirstName + " " + LastName,
        });
        const emailVal = Email.value;
        const passVal = Password.value;
        const role = "user"
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          FirstName,
          LastName,
          emailVal,
          passVal,
          role
        })
        alert("Register successfully!!");
        window.location.href = "./signIn.html"
        // .then((userCredential) => {
        // // Signed up 
        //     const user = userCredential.user;
        //     console.log(user);
        //     const db = getDatabase();
        //     set(ref(db, "users/" + user.uid), {
        //       Email,
        //       Password,
        //       FirstName,
        //       LastName,
        //       conPass
        //     })
        //   window.location.href = "./signIn.html"
        // // ...
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        // // ..
        // });

      }
      else{
        alert("Password must be longer than 6");
      }
    }
    else{
        if(emailField.classList.contains("invalid"))
        {
          alert("Please enter email!!!");
        }
        else if(passField.classList.contains("invalid")){
          alert("Password must have at least 8 characters with number, symbol, small and capital letter!!!")
        }
        else if(cPassField.classList.contains("invalid")){
          alert("Confirm password must be the same with password!!!!")
        }
        else{
          alert("Email and password are invalid!!!")
        }
    }

})


// function SignUp(event) {
//   let FirstName = document.getElementById("First_Name").value;
//   let LastName = document.getElementById("Last_Name").value;
//   let Email = document.getElementById("email").value;
//   let Password = document.getElementById("password").value;
//   let formData = JSON.parse(localStorage.getItem("formData")) || [];
//   let Exist = formData.some((data) => {
//     data.Email === Email;
//   });
//   if (Password.length >= 8) {
//     if (!Exist) {
//       formData.push({ FirstName, LastName, Email, Password });
//       localStorage.setItem("formData", JSON.stringify(formData));
//       alert("Sign Up Successfully");
//     } else {
//       alert("Account existed!");
//     }
//   } else {
//     alert("Password must be longer than 8 characters");
//   }
//   event.preventDefault();
// }

// function SignIn(event) {
//   let Email = document.getElementById("email").value;
//   let Password = document.getElementById("password").value;
//   console.log(Password);
//   let formData = JSON.parse(localStorage.getItem("formData")) || [];
//   let Exist = formData.some(
//     (data) => data.Email === Email && data.Password === Password
//   );
//   console.log(formData, Exist);
//   if (Exist) {
//     alert("Sign In Successfully");
//     window.location.href = "./../index.html";
//   } else {
//     alert("Sign In Failed. Try Again!");
//   }
//   event.preventDefault();
// }