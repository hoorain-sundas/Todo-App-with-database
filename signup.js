  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import { getAuth, 
    createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBFXWCVKSMhsD3OlvmLCj-ZwyYR64BPwjs",
    authDomain: "todo-app-final-bd1f6.firebaseapp.com",
    projectId: "todo-app-final-bd1f6",
    storageBucket: "todo-app-final-bd1f6.appspot.com",
    messagingSenderId: "707497697865",
    appId: "1:707497697865:web:1d08e435eefcb53a429598",
    measurementId: "G-T16TRRQ3C8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var model;

  window.signUp = function (e) {
  e.preventDefault();
  model = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    password: password.value,
  };
    fname.value ="";
    lname.value ="";
    email.value ="";
    password.value ="";
   
    createUserWithEmailAndPassword(auth, model.email, model.password)
    .then(function(success){
        console.log(success.user.uid)
        window.location.replace('login.html');
      })
      .catch(function(err){
        console.log(err)
      });
      console.log(model);
}
