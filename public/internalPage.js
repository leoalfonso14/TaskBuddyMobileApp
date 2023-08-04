//Firebase Config Information
const firebaseConfig = {
  apiKey: "AIzaSyAW6xhxT_ycudLcNJL9OIt6Y5AAuzky-Po",
  authDomain: "taskbuddy-9c3f6.firebaseapp.com",
  projectId: "taskbuddy-9c3f6",
  storageBucket: "taskbuddy-9c3f6.appspot.com",
  messagingSenderId: "326763319334",
  appId: "1:326763319334:web:5aee080b91f1d7d85756e7",
  measurementId: "G-0KCSZMXRL0",
};

//Initialize firebase, auth, and our db references.
firebase.initializeApp(firebaseConfig);
auth = firebase.auth();
db = firebase.firestore();

//var user = userCredential.user;

// todo: DISPLAY LOADER
//CHECK IF USER IS LOGGED IN - IF NOT SEND TO REGISTRATION/SIGNIN PAGE
//IF LOGGED IN THEN DISPLAY PAGE WITH USERS STUFF
var auth = firebase.auth();
console.log("auth", auth);
let email;
auth.onAuthStateChanged((user) => {
  console.log("user", user);
  if (user == null) {
    // Sign-out successful.
    console.log("Sign-out successful");
    window.location.href = "./index.html";
  } else {
    var internalPage = document.getElementsByClassName("InternalPage")[0];
    internalPage.style.display = "block";
    // LOAD ALL THE USER DATA THAT IS NEEDED
    // LOGIC TO DISPLAY NAME BASED ON EMAIL - IF USER HAS ALREADY ENTERED A NAME IN THE SETTINGS CHOSE THAT
    email = user.email;
    console.log("email", email);
    var position = email.search("@");
    var tempName = email.substring(0, position);
    var userTitle = document.getElementsByClassName("userTitle")[0];
    userTitle.textContent = tempName;
  }
});

const logoutClick = document.querySelector(".logout");
logoutClick.addEventListener("click", function () {
  // toggle the type attribute
  signOut();
});

function signOut() {
  firebase.auth().signOut();
}