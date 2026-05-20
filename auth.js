// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification   // ✅ ADD THIS
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA2ytO0jnhM9baGrByUS1jgSc47q6xJ64s",
  authDomain: "astrodhani-935c8.firebaseapp.com",
  projectId: "astrodhani-935c8"
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.signup = async function(){

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const phone =
document.getElementById("phone").value;

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

const dob =
document.getElementById("dob").value;

const birthTime =
document.getElementById("birthTime").value;

const birthPlace =
document.getElementById("birthPlace").value;

const gender =
document.getElementById("gender").value;

const terms =
document.getElementById("terms").checked;

/* VALIDATION */

if(
!name ||
!email ||
!phone ||
!password ||
!confirmPassword
){

alert(
"Please fill all required fields"
);

return;

}

if(password !== confirmPassword){

alert(
"Passwords do not match"
);

return;

}

if(password.length < 6){

alert(
"Password must be at least 6 characters"
);

return;

}

if(!terms){

alert(
"Please accept Terms & Conditions"
);

return;

}

try{

const userCred =

await createUserWithEmailAndPassword(
auth,
email,
password
);

/* SAVE USER PROFILE */

await setDoc(

doc(
db,
'users',
userCred.user.uid
),

{

name,
email,
phone,
dob,
birthTime,
birthPlace,
gender,

createdAt:
new Date()

}

);

/* EMAIL VERIFY */

await sendEmailVerification(
userCred.user
);

alert(
"📩 Verification email sent! Please check your inbox."
);

window.location =
'login.html';

}catch(err){

alert(err.message);

}

}


// LOGIN
window.login = function(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {

      if (!userCred.user.emailVerified) {
        alert("❌ Please verify your email first");
        return;
      }

      window.location = "index.html";
    })
    .catch(err => alert(err.message));
}

// LOGOUT
window.logout = function(){
  signOut(auth);
}

// 🔥 UI UPDATE FUNCTION (FINAL FIX)
function updateUI(user){

  const loginBtns = document.querySelectorAll(".loginBtn");
  const signupBtns = document.querySelectorAll(".signupBtn");
  const logoutBtns = document.querySelectorAll(".logoutBtn");

  const avatars = document.querySelectorAll(".avatarLetter");
  const emails = document.querySelectorAll("#userEmail");

  if(user){

    avatars.forEach(el => el.innerText = user.email.charAt(0).toUpperCase());
    emails.forEach(el => el.innerText = user.email);

    loginBtns.forEach(el => el.style.display = "none");
    signupBtns.forEach(el => el.style.display = "none");
    logoutBtns.forEach(el => el.style.display = "block");

  } else {

    avatars.forEach(el => el.innerText = "G");
    emails.forEach(el => el.innerText = "Guest");

    loginBtns.forEach(el => el.style.display = "block");
    signupBtns.forEach(el => el.style.display = "block");
    logoutBtns.forEach(el => el.style.display = "none");
  }
}

// 🔥 PROPER INIT
document.addEventListener("DOMContentLoaded", () => {
 onAuthStateChanged(auth, (user) => {
    // Select all buttons
    const loginBtns = document.querySelectorAll(".loginBtn");
    const signupBtns = document.querySelectorAll(".signupBtn");
    const logoutBtns = document.querySelectorAll(".logoutBtn");
    
    // Select display elements
    const avatars = document.querySelectorAll(".avatarLetter");
    const emails = document.querySelectorAll("#userEmail");

    if (user) {
        console.log("✅ User is logged in:", user.email);
        
        // Update UI Text
        avatars.forEach(el => el.innerText = user.email.charAt(0).toUpperCase());
        emails.forEach(el => el.innerText = user.email);

        // LOGIC: Hide Login/Signup, Show Logout
        loginBtns.forEach(btn => btn.classList.add("hide-now"));
        signupBtns.forEach(btn => btn.classList.add("hide-now"));
        logoutBtns.forEach(btn => btn.classList.remove("hide-now"));

    } else {
        console.log("❌ No user logged in");
        
        // Reset UI Text
        avatars.forEach(el => el.innerText = "G");
        emails.forEach(el => el.innerText = "Guest");

        // LOGIC: Show Login/Signup, Hide Logout
        loginBtns.forEach(btn => btn.classList.remove("hide-now"));
        signupBtns.forEach(btn => btn.classList.remove("hide-now"));
        logoutBtns.forEach(btn => btn.classList.add("hide-now"));
    }
});
});
