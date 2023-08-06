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

// todo: DISPLAY LOADER
//CHECK IF USER IS LOGGED IN - IF NOT SEND TO REGISTRATION/SIGNIN PAGE
//IF LOGGED IN THEN DISPLAY PAGE WITH USERS STUFF
var auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user == null) {
    // Sign-out successful.
    console.log("Sign-out successful");
    window.location.href = "./index.html";
  } else {
    var internalPage = document.getElementsByClassName("InternalPage")[0];
    internalPage.style.display = "flex";

    // Get the userTitle element
    var userTitle = document.querySelector(".userTitle");
    var email = user.email;
    var position = email.search("@");
    var tempName = email.substring(0, position);

    var UserID = user.uid;
    let nickName;

    db.collection("users")
      .doc(UserID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          nickName = doc.data().fullName;
          if (nickName) {
            userTitle.textContent = nickName;
          }
        } else {
          console.log("No Such Document");
          userTitle.textContent = tempName;
          set(tempName);
        }
      });
  }
});

function set(tempName) {
  var UserID = auth.currentUser.uid;
  db.collection("users")
    .doc(UserID)
    .set({
      fullName: tempName,
    })
    .then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.log("Error!");
    });
}

const logoutClick = document.querySelector(".logout");
logoutClick.addEventListener("click", function () {
  // toggle the type attribute
  signOut();
});

function signOut() {
  firebase.auth().signOut();
}

// $("#os-phrases > h2")
//   .css("opacity", 1)
//   .lettering("words")
//   .children("span")
//   .lettering()
//   .children("span")
//   .lettering();

// // Progress bars
// $(document).ready(function () {
//   $(".progress .progress-bar").css("width", function () {
//     return $(this).attr("aria-valuenow") + "%";
//   });
// });
