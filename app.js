 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
 import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
 import { getDatabase, ref, set, push, 
    onChildAdded, remove,  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
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
 const database = getDatabase();
 

var inp = document.getElementById("inp");
var todoList = document.getElementById("todoList");
var gettodo = document.getElementById("gettodo");
var userName = document.getElementById("u123");

var arr =[];
var obj;
let taskReference;
 window.addData = function () {
  // e.preventDefault();
   if (editId){
     obj = {
       input: inp.value,
       date: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}  T ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`),
       updateAt: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}  T ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`),
       userName: "xyz",
     };
     taskReference = ref(database, `todotasks/${editId}`);
    } else {
    obj = {
      input: inp.value,
      date: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}  T ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`),
      userName: "xyz",
   };
   
   const keyRef = ref(database, "todotasks/");
   obj.id = push(keyRef).key;
   console.log(obj.id)
  //  const 
   taskReference = ref(database, `todotasks/${obj.id}`);
   }
    
   arr.push(obj);
   inp.value = "";
   console.log(arr);
   set(taskReference, obj);
   // console.log(obj);
   renderUI();
   
   }
 
  function renderUI(){
    todoList.innerHTML = "";
    for(var i=0; i<arr.length; i++){
      console.log(`${arr[i].id}`);
    // todoList.innerHTML += `<li class="main2">${obj.input}  <button onclick="deleteData(${obj.id})" class="btn-primary btn1 border p-1 rounded m-2" id="btn2">Delete</button> <br> ${obj.date} </li>`;
    todoList.innerHTML += `<li class="main2">${arr[i].input}  
    <button onclick="deleteData(this,'${arr[i].id}')" class="btn-primary btn1 border p-1 rounded m-2" id="btn2">Delete</button> 
    <button onclick="editData('${arr[i].input}','${arr[i].id}')" class="btn-primary btn1 border px-3 py-1 rounded m-2" id="btn2">Edit</button>
    <br> ${arr[i].date} </li>`;
    
    }
    
  }
   window.logout = function(){
    signOut(auth)
     .then(function() {
          // Sign-out successful.
         console.log("Sign-out successful");
         window.location.replace('login.html');
      }).catch(function(err) {
        // An error happened.
        console.log(err);
      });
}

var showdata;
window.getData = function () {
  arr = [];
 
    console.log("hey");
    
    const taskReference = ref(database, "todotasks/");
    onChildAdded(taskReference, function (data) {
        console.log(data.val());
        showdata = data.val();
      //  console.log(showdata.input)
       arr.push(showdata);
       renderUI();
   
    });
}

 window.deleteData = function (f,e) {
    console.log(f)
    var g = f.parentNode;
    const taskRef =ref(database,`todotasks/${e}`)
    remove(taskRef,g)
    
    .then(function (e) {
        console.log(e);
        getData();
        
    })
    .catch(function (er) {
        console.log(er);
        });  
 }
  var editId;
 window.editData = function (input,id) {
    console.log(input,id);
    inp.value = input;
    editId = id;
 }

 function checkAuthentication() { 
    onAuthStateChanged(auth, function (user) {
     if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/firebase.User
       const uid = user.uid;
       console.log(uid)
  
       // ...
     } else {
       // User is signed out
       // ...
       window.location.href = "login.html";
     }
   });
   }
   checkAuthentication();
