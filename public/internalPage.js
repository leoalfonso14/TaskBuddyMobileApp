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
var user = firebase.auth();
console.log(user);
console.log(user.P);
// console.log(user);

if (firebase.auth().currentUser != null) {
  console.log("Not authenticated", firebase.auth());
  window.location.href = "./index.html";
} else {
  console.log("Authenticated");
}

const logoutClick = document.querySelector(".logout");
logoutClick.addEventListener("click", function () {
  // toggle the type attribute
  signOut();
});

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}
