// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// YOUR CONFIG
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
    .then(() => alert("Signup successful"))
    .catch(err => alert(err.message));
}

// LOGIN
window.login = function(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location = "index.html")
    .catch(err => alert(err.message));
}

// LOGOUT
window.logout = function(){
  signOut(auth);
}

// USER STATE
onAuthStateChanged(auth, (user) => {

  // DELAY FIX (VERY IMPORTANT)
  setTimeout(() => {

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const avatarLetter = document.getElementById("avatarLetter");
    const userEmail = document.getElementById("userEmail");

    if(user){

      console.log("User logged in:", user.email);

      // Avatar
      if(avatarLetter){
        avatarLetter.innerText = user.email.charAt(0).toUpperCase();
      }

      // Email
      if(userEmail){
        userEmail.innerText = user.email;
      }

      // Hide login/signup
      if(loginBtn) loginBtn.style.display = "none";
      if(signupBtn) signupBtn.style.display = "none";

      // Show logout
      if(logoutBtn) logoutBtn.style.display = "block";

    } else {

      console.log("No user");

      if(avatarLetter) avatarLetter.innerText = "G";
      if(userEmail) userEmail.innerText = "Guest";

      if(loginBtn) loginBtn.style.display = "block";
      if(signupBtn) signupBtn.style.display = "block";
      if(logoutBtn) logoutBtn.style.display = "none";
    }

  }, 300); // 🔥 THIS FIXES TIMING ISSUE

});
