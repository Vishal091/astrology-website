// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA2ytO0jnhM9baGrByUS1jgSc47q6xJ64s",
  authDomain: "astrodhani-935c8.firebaseapp.com",
  projectId: "astrodhani-935c8"
};

// INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SIGNUP
window.signup = function(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCred) => {

      await sendEmailVerification(userCred.user);

      alert("📩 Verification email sent! Check your inbox.");

    })
    .catch(err => alert(err.message));
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
